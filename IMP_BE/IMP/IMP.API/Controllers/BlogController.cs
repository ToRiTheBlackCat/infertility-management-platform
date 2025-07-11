using IMP.Repository.ViewModels.BlogPost;
using IMP.Service.Services.BlogSer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService blogService;
        public BlogController(IBlogService blogService)
        {
            this.blogService = blogService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogs = await blogService.GetAllBlogPostsAsync();
            if (blogs == null || !blogs.Any())
            {
                return NotFound("No blogs found.");
            }
            return Ok(blogs);
        }

        [HttpGet("{blogId}")]
        public async Task<IActionResult> GetBlogById(int blogId)
        {
            var blog = await blogService.GetBlogPostByIdAsync(blogId);
            if (blog == null)
            {
                return NotFound($"Blog with ID {blogId} not found.");
            }
            return Ok(blog);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromBody] CreateBlogRequest blogPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdBlog = await blogService.CreateBlogPostAsync(blogPost);
            if (createdBlog == null)
            {
                return BadRequest("Failed to create blog post.");
            }
            var blog = await blogService.GetBlogPostByIdAsync(createdBlog.BlogPostId);

            return Ok(blog);
        }

        [HttpPut("{blogId}")]
        public async Task<IActionResult> UpdateBlog(int blogId, [FromBody] UpdateBlogRequest blogPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedBlog = await blogService.UpdateBlogPostAsync(blogId, blogPost);
            if (updatedBlog == null)
            {
                return NotFound($"Blog with ID {blogId} not found.");
            }
            return Ok(updatedBlog);
        }

        [HttpDelete("{blogId}")]
        public async Task<IActionResult> DeleteBlog(int blogId)
        {
            var isDeleted = await blogService.DeleteBlogPostAsync(blogId);
            if (!isDeleted)
            {
                return NotFound($"Blog with ID {blogId} not found.");
            }
            return NoContent();
        }
    }
}
