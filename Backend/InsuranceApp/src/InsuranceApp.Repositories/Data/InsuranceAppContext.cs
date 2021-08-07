﻿using InsuranceApp.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace InsuranceApp.Repositories.Data
{
    public class InsuranceAppContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public InsuranceAppContext(DbContextOptions<InsuranceAppContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
