﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace IMP.Repository.Models;

public partial class ExpertField
{
    public int ExpertFieldId { get; set; }

    public string ExpertFieldName { get; set; }

    public virtual ICollection<DoctorExpertField> DoctorExpertFields { get; set; } = new List<DoctorExpertField>();

    public virtual ICollection<Treatment> Treatments { get; set; } = new List<Treatment>();
}