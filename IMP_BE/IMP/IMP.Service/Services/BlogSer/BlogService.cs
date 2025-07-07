using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.BlogPost;
using Microsoft.Extensions.Configuration;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.BlogSer
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync();
        Task<BlogPost?> GetBlogPostByIdAsync(int id);
        Task<BlogPost?> CreateBlogPostAsync(CreateBlogRequest blogPost);
        Task<BlogPost?> UpdateBlogPostAsync(int id, UpdateBlogRequest blogPost);
        Task<bool> DeleteBlogPostAsync(int id);
    }
    public class BlogService : IBlogService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IConfiguration _configure;

        public BlogService(UnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configure = configuration;
        }

        public async Task<BlogPost?> CreateBlogPostAsync(CreateBlogRequest blogPost)
        {
            if (blogPost == null)
            {
                throw new ArgumentNullException(nameof(blogPost), "Blog post cannot be null");
            }
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var newBlogPost = new BlogPost
                {
                    Image = blogPost.Image,
                    DoctorId = blogPost.DoctorId,
                    PostTitle = blogPost.PostTitle,
                    PostContent = blogPost.PostContent,
                    CreatedDate = DateTime.UtcNow,
                    Viewers = 0,
                    Status = blogPost.Status ?? "Active"
                };
                await _unitOfWork.BlogRepo.CreateAsync(newBlogPost);
                await _unitOfWork.CommitTransactionAsync();
                return await _unitOfWork.BlogRepo.GetByIdAsync(newBlogPost.BlogPostId);
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                Log.Error(ex, "An unexpected error occurred");
                return null;
            }
        }

        public async Task<bool> DeleteBlogPostAsync(int id)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var blogPost = await _unitOfWork.BlogRepo.GetByIdAsync(id);
                if (blogPost == null)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    return false;
                }
                var isDeleted = await _unitOfWork.BlogRepo.RemoveAsync(blogPost);
                if (isDeleted == false)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    return false;
                }
                await _unitOfWork.CommitTransactionAsync();
                return true;
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                Log.Error(ex, "An unexpected error occurred");
                return false;
            }
        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync()
        {
            await _unitOfWork.BeginTransactionAsync();
            var blogPosts = await _unitOfWork.BlogRepo.GetAllWithIncludeAsync();
            if (blogPosts == null || !blogPosts.Any())
            {
                await _unitOfWork.RollbackTransactionAsync();
                return new List<BlogPost>();
            }
            await _unitOfWork.CommitTransactionAsync();
            return blogPosts;
        }

        public async Task<BlogPost?> GetBlogPostByIdAsync(int id)
        {
            await _unitOfWork.BeginTransactionAsync();
            var blogPost = await _unitOfWork.BlogRepo.GetByIdAsync(id);
            if (blogPost == null)
            {
                await _unitOfWork.RollbackTransactionAsync();
                return null;
            }
            blogPost.Viewers += 1; 
            await _unitOfWork.BlogRepo.UpdateAsync(blogPost);
            await _unitOfWork.CommitTransactionAsync();
            return blogPost;
        }

        public async Task<BlogPost?> UpdateBlogPostAsync(int id, UpdateBlogRequest blogPost)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var existingBlogPost = await _unitOfWork.BlogRepo.GetByIdAsync(id);
                if (existingBlogPost == null)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    return null;
                }
                existingBlogPost.Image = blogPost.Image ?? existingBlogPost.Image;
                existingBlogPost.DoctorId = blogPost.DoctorId != 0 ? blogPost.DoctorId : existingBlogPost.DoctorId; 
                existingBlogPost.PostTitle = blogPost.PostTitle ?? existingBlogPost.PostTitle;
                existingBlogPost.PostContent = blogPost.PostContent ?? existingBlogPost.PostContent;
                existingBlogPost.Viewers = blogPost.Viewers ?? existingBlogPost.Viewers;
                existingBlogPost.Status = blogPost.Status ?? existingBlogPost.Status;

                await _unitOfWork.BlogRepo.UpdateAsync(existingBlogPost);
                await _unitOfWork.CommitTransactionAsync();                
                return await _unitOfWork.BlogRepo.GetByIdAsync(existingBlogPost.BlogPostId);
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                Log.Error(ex, "An unexpected error occurred");
                return null;
            }
        }
    }
}
