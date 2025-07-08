using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Helpers
{
    public static class ImageHelper
    {
        public static bool IsValidImageFile(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
                return false;

            var permittedMimeTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/webp" };
            if (permittedMimeTypes.Contains(imageFile.ContentType.ToLower()))
            {
                var extension = Path.GetExtension(imageFile.FileName).ToLowerInvariant();
                var validExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                if (validExtensions.Contains(extension))
                {
                    return true;
                }
            }

            return false;
        }

        public static string SaveImage(IFormFile imageFile, string savedName, string folderName, IWebHostEnvironment _env)
        {
            string saveFolder = Path.Combine(_env.WebRootPath, "images", folderName);
            Directory.CreateDirectory(saveFolder); 

            string fullPath = Path.Combine(saveFolder, savedName);
            using var stream = new FileStream(fullPath, FileMode.Create);
            imageFile.CopyTo(stream);

            string fileName = @$"{folderName}\{savedName}";
            return fileName;
        }

    }
}
