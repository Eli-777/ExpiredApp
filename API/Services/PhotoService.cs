using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Services
{
  public class PhotoService : IPhotoService
  {
      private readonly Cloudinary _Cloudinary;
    public PhotoService(IOptions<CloudinarySettings> congig)
    {
        var acc = new Account 
        (
            congig.Value.CloudName,
            congig.Value.ApiKey,
            congig.Value.ApiSecret
        );
        _Cloudinary = new Cloudinary(acc);
    }

    public async Task<ImageUploadResult> AddPhotoAsync(string file)
    {
      var uploadResult = new ImageUploadResult();

      if(file.Length > 0) 
      {
          var uploadParams = new ImageUploadParams
          {
              File = new FileDescription(@file),
              Transformation = new Transformation().Height(500).Width(500).Crop("fill")
          };
          uploadResult = await _Cloudinary.UploadAsync(uploadParams);
      }
      return uploadResult;
    }

    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
      var deleteParams = new DeletionParams(publicId);
      var result = await _Cloudinary.DestroyAsync(deleteParams);
      return result;
    }
  }
}