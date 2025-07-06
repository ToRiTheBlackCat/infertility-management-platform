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

        [HttpGet()]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogs = await blogService.GetAllBlogPostsAsync();
            if (blogs == null || !blogs.Any())
            {
                return NotFound("No blogs found.");
            }
            return Ok(blogs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogById(int id)
        {
            var blog = await blogService.GetBlogPostByIdAsync(id);
            if (blog == null)
            {
                return NotFound($"Blog with ID {id} not found.");
            }
            return Ok(blog);
        }

        [HttpPost()]
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromBody] UpdateBlogRequest blogPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedBlog = await blogService.UpdateBlogPostAsync(id, blogPost);
            if (updatedBlog == null)
            {
                return NotFound($"Blog with ID {id} not found.");
            }
            return Ok(updatedBlog);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var isDeleted = await blogService.DeleteBlogPostAsync(id);
            if (!isDeleted)
            {
                return NotFound($"Blog with ID {id} not found.");
            }
            return NoContent();
        }
    }
}
