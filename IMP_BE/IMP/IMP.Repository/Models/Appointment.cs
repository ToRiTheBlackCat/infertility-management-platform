﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace IMP.Repository.Models;

public partial class Appointment
{
    public int AppointmentId { get; set; }

    public int BookingId { get; set; }

    public DateTime Date { get; set; }

    public int PatientId { get; set; }

    public string Status { get; set; }

    public string Note { get; set; }

    public virtual TreatmentBooking Booking { get; set; }

    public virtual ICollection<StepDetail> StepDetails { get; set; } = new List<StepDetail>();
}