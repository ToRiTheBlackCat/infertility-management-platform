﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.Auth
{
    public class LoginResponse
    {
        public string? UserId { get; set; }
        public string? RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}
