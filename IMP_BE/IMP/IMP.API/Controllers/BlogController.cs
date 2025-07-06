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

        [HttpGet("Blog")]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogs = await blogService.GetAllBlogPostsAsync();
            if (blogs == null || !blogs.Any())
            {
                return NotFound("No blogs found.");
            }
            return Ok(blogs);
        }

        [HttpGet("Blog/{id}")]
        public async Task<IActionResult> GetBlogById(int id)
        {
            var blog = await blogService.GetBlogPostByIdAsync(id);
            if (blog == null)
            {
                return NotFound($"Blog with ID {id} not found.");
            }
            return Ok(blog);
        }

        [HttpPost("Blog")]
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
            return CreatedAtAction(nameof(GetBlogById), new { id = createdBlog.BlogPostId }, createdBlog);
        }
    }
}
