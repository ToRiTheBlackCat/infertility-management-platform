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
        Task<BlogPost?> GetBlogPostByIdAsync(int blogId);
        Task<BlogPost?> CreateBlogPostAsync(CreateBlogRequest blogPost);
        Task<BlogPost?> UpdateBlogPostAsync(int blogId, UpdateBlogRequest blogPost);
        Task<bool> DeleteBlogPostAsync(int blogId);
    }
    public class BlogService : IBlogService
    {
        private readonly UnitOfWork _unitOfWork;

        public BlogService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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

        public async Task<bool> DeleteBlogPostAsync(int blogId)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var blogPost = await _unitOfWork.BlogRepo.GetByIdAsync(blogId);
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

        public async Task<BlogPost?> GetBlogPostByIdAsync(int blogId)
        {
            await _unitOfWork.BeginTransactionAsync();
            var blogPost = await _unitOfWork.BlogRepo.GetByIdAsync(blogId);
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

        public async Task<BlogPost?> UpdateBlogPostAsync(int blogId, UpdateBlogRequest blogPost)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var existingBlogPost = await _unitOfWork.BlogRepo.GetByIdAsync(blogId);
                if (existingBlogPost == null)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    return null;
                }
                existingBlogPost.Image = blogPost.Image ?? existingBlogPost.Image;
                existingBlogPost.PostTitle = blogPost.PostTitle ?? existingBlogPost.PostTitle;
                existingBlogPost.PostContent = blogPost.PostContent ?? existingBlogPost.PostContent;

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
