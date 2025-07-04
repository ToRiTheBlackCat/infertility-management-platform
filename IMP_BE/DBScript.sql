USE [master]
GO
/****** Object:  Database [InfertilityTreatmentDB]    Script Date: 7/3/2025 1:56:43 PM ******/
CREATE DATABASE [InfertilityTreatmentDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'InfertilityTreatmentDB', FILENAME = N'D:\Tools\SQL\MSSQL15.MSSQLSERVER\MSSQL\DATA\InfertilityTreatmentDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'InfertilityTreatmentDB_log', FILENAME = N'D:\Tools\SQL\MSSQL15.MSSQLSERVER\MSSQL\DATA\InfertilityTreatmentDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [InfertilityTreatmentDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [InfertilityTreatmentDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [InfertilityTreatmentDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET RECOVERY FULL 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET  MULTI_USER 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [InfertilityTreatmentDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [InfertilityTreatmentDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'InfertilityTreatmentDB', N'ON'
GO
ALTER DATABASE [InfertilityTreatmentDB] SET QUERY_STORE = OFF
GO
USE [InfertilityTreatmentDB]
GO
/****** Object:  Table [dbo].[Appointment]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appointment](
	[AppointmentId] [int] NOT NULL,
	[BookingId] [int] NOT NULL,
	[Date] [datetime] NOT NULL,
	[PatientId] [int] NOT NULL,
	[Status] [nchar](50) NOT NULL,
	[Note] [nvarchar](255) NULL,
 CONSTRAINT [PK_Appointment] PRIMARY KEY CLUSTERED 
(
	[AppointmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BlogPost]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BlogPost](
	[BlogPostId] [int] IDENTITY(1,1) NOT NULL,
	[Image] [nvarchar](max) NULL,
	[DoctorId] [int] NOT NULL,
	[PostTitle] [nvarchar](255) NOT NULL,
	[PostContent] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[Viewers] [int] NULL,
	[Status] [nchar](50) NOT NULL,
 CONSTRAINT [PK_BlogPost] PRIMARY KEY CLUSTERED 
(
	[BlogPostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Doctor]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Doctor](
	[DoctorId] [int] NOT NULL,
	[AvatarImage] [nvarchar](max) NULL,
	[FullName] [nvarchar](255) NOT NULL,
	[YearOfBirth] [int] NOT NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[Gender] [char](10) NOT NULL,
	[Address] [nvarchar](255) NULL,
	[Degree] [nvarchar](255) NULL,
	[AverageScore] [float] NULL,
	[Status] [nchar](50) NOT NULL,
 CONSTRAINT [PK_Doctor] PRIMARY KEY CLUSTERED 
(
	[DoctorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DoctorExpertField]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DoctorExpertField](
	[DoctorId] [int] NOT NULL,
	[ExpertFieldId] [int] NOT NULL,
 CONSTRAINT [PK_DoctorExpertField] PRIMARY KEY CLUSTERED 
(
	[DoctorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DoctorSchedule]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DoctorSchedule](
	[DoctorId] [int] NOT NULL,
	[Monday] [bit] NOT NULL,
	[Tuesday] [bit] NOT NULL,
	[Wednesday] [bit] NOT NULL,
	[Thursday] [bit] NOT NULL,
	[Friday] [bit] NOT NULL,
	[Saturday] [bit] NOT NULL,
	[Sunday] [bit] NOT NULL,
 CONSTRAINT [PK_DoctorSchedule] PRIMARY KEY CLUSTERED 
(
	[DoctorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExpertField]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExpertField](
	[ExpertFieldId] [int] NOT NULL,
	[ExpertFieldName] [nvarchar](150) NOT NULL,
 CONSTRAINT [PK_ExpertField] PRIMARY KEY CLUSTERED 
(
	[ExpertFieldId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[PatientId] [int] NOT NULL,
	[BookingId] [int] NOT NULL,
	[TreatmentId] [int] NOT NULL,
	[TreatmentScore] [float] NOT NULL,
	[DoctorScore] [float] NOT NULL,
	[TreatmentComment] [nvarchar](255) NULL,
	[CreateDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Feedback] PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC,
	[BookingId] ASC,
	[TreatmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patient](
	[PatientId] [int] NOT NULL,
	[FullName] [nvarchar](255) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
	[Gender] [char](10) NOT NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[Address] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Patient] PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nchar](30) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StepDetail]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StepDetail](
	[StepId] [int] NOT NULL,
	[AppointmentId] [int] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Status] [nchar](50) NOT NULL,
 CONSTRAINT [PK_StepDetail] PRIMARY KEY CLUSTERED 
(
	[StepId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Treatment]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Treatment](
	[TreatmentId] [int] IDENTITY(1,1) NOT NULL,
	[TreatmentName] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[RatingScore] [float] NULL,
	[Image] [nvarchar](max) NULL,
	[ExpertFieldId] [int] NULL,
 CONSTRAINT [PK_Treatment] PRIMARY KEY CLUSTERED 
(
	[TreatmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TreatmentBooking]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TreatmentBooking](
	[BookingId] [int] IDENTITY(1,1) NOT NULL,
	[PatientId] [int] NOT NULL,
	[DoctorId] [int] NOT NULL,
	[TreatmentId] [int] NOT NULL,
	[Status] [nchar](50) NOT NULL,
	[CreatedDate] [date] NULL,
 CONSTRAINT [PK_TreatmentBooking] PRIMARY KEY CLUSTERED 
(
	[BookingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TreatmentRecord]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TreatmentRecord](
	[PatientId] [int] NOT NULL,
	[BookingId] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NULL,
 CONSTRAINT [PK_TreatmentRecord] PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC,
	[BookingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TreatmentStep]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TreatmentStep](
	[StepId] [int] IDENTITY(1,1) NOT NULL,
	[TreatmentId] [int] NOT NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_TreatmentStep] PRIMARY KEY CLUSTERED 
(
	[StepId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 7/3/2025 1:56:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](80) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[RefreshToken] [nvarchar](512) NULL,
	[RefreshTokenExpirity] [datetime] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[RoleId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FK_Appointment_TreatmentBooking] FOREIGN KEY([BookingId])
REFERENCES [dbo].[TreatmentBooking] ([BookingId])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FK_Appointment_TreatmentBooking]
GO
ALTER TABLE [dbo].[BlogPost]  WITH CHECK ADD  CONSTRAINT [FK_BlogPost_Doctor] FOREIGN KEY([DoctorId])
REFERENCES [dbo].[Doctor] ([DoctorId])
GO
ALTER TABLE [dbo].[BlogPost] CHECK CONSTRAINT [FK_BlogPost_Doctor]
GO
ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_User] FOREIGN KEY([DoctorId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_User]
GO
ALTER TABLE [dbo].[DoctorExpertField]  WITH CHECK ADD  CONSTRAINT [FK_DoctorExpertField_Doctor] FOREIGN KEY([DoctorId])
REFERENCES [dbo].[Doctor] ([DoctorId])
GO
ALTER TABLE [dbo].[DoctorExpertField] CHECK CONSTRAINT [FK_DoctorExpertField_Doctor]
GO
ALTER TABLE [dbo].[DoctorExpertField]  WITH CHECK ADD  CONSTRAINT [FK_DoctorExpertField_ExpertField] FOREIGN KEY([ExpertFieldId])
REFERENCES [dbo].[ExpertField] ([ExpertFieldId])
GO
ALTER TABLE [dbo].[DoctorExpertField] CHECK CONSTRAINT [FK_DoctorExpertField_ExpertField]
GO
ALTER TABLE [dbo].[DoctorSchedule]  WITH CHECK ADD  CONSTRAINT [FK_DoctorSchedule_Doctor] FOREIGN KEY([DoctorId])
REFERENCES [dbo].[Doctor] ([DoctorId])
GO
ALTER TABLE [dbo].[DoctorSchedule] CHECK CONSTRAINT [FK_DoctorSchedule_Doctor]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FK_Feedback_TreatmentBooking] FOREIGN KEY([BookingId])
REFERENCES [dbo].[TreatmentBooking] ([BookingId])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FK_Feedback_TreatmentBooking]
GO
ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_User] FOREIGN KEY([PatientId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_User]
GO
ALTER TABLE [dbo].[StepDetail]  WITH CHECK ADD  CONSTRAINT [FK_StepDetail_Appointment] FOREIGN KEY([AppointmentId])
REFERENCES [dbo].[Appointment] ([AppointmentId])
GO
ALTER TABLE [dbo].[StepDetail] CHECK CONSTRAINT [FK_StepDetail_Appointment]
GO
ALTER TABLE [dbo].[StepDetail]  WITH CHECK ADD  CONSTRAINT [FK_StepDetail_TreatmentStep] FOREIGN KEY([StepId])
REFERENCES [dbo].[TreatmentStep] ([StepId])
GO
ALTER TABLE [dbo].[StepDetail] CHECK CONSTRAINT [FK_StepDetail_TreatmentStep]
GO
ALTER TABLE [dbo].[Treatment]  WITH CHECK ADD  CONSTRAINT [FK_Treatment_ExpertField] FOREIGN KEY([ExpertFieldId])
REFERENCES [dbo].[ExpertField] ([ExpertFieldId])
GO
ALTER TABLE [dbo].[Treatment] CHECK CONSTRAINT [FK_Treatment_ExpertField]
GO
ALTER TABLE [dbo].[TreatmentBooking]  WITH CHECK ADD  CONSTRAINT [FK_TreatmentBooking_Doctor] FOREIGN KEY([DoctorId])
REFERENCES [dbo].[Doctor] ([DoctorId])
GO
ALTER TABLE [dbo].[TreatmentBooking] CHECK CONSTRAINT [FK_TreatmentBooking_Doctor]
GO
ALTER TABLE [dbo].[TreatmentBooking]  WITH CHECK ADD  CONSTRAINT [FK_TreatmentBooking_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO
ALTER TABLE [dbo].[TreatmentBooking] CHECK CONSTRAINT [FK_TreatmentBooking_Patient]
GO
ALTER TABLE [dbo].[TreatmentBooking]  WITH CHECK ADD  CONSTRAINT [FK_TreatmentBooking_Treatment] FOREIGN KEY([TreatmentId])
REFERENCES [dbo].[Treatment] ([TreatmentId])
GO
ALTER TABLE [dbo].[TreatmentBooking] CHECK CONSTRAINT [FK_TreatmentBooking_Treatment]
GO
ALTER TABLE [dbo].[TreatmentRecord]  WITH CHECK ADD  CONSTRAINT [FK_TreatmentRecord_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO
ALTER TABLE [dbo].[TreatmentRecord] CHECK CONSTRAINT [FK_TreatmentRecord_Patient]
GO
ALTER TABLE [dbo].[TreatmentRecord]  WITH CHECK ADD  CONSTRAINT [FK_TreatmentRecord_TreatmentBooking] FOREIGN KEY([BookingId])
REFERENCES [dbo].[TreatmentBooking] ([BookingId])
GO
ALTER TABLE [dbo].[TreatmentRecord] CHECK CONSTRAINT [FK_TreatmentRecord_TreatmentBooking]
GO
ALTER TABLE [dbo].[TreatmentStep]  WITH CHECK ADD  CONSTRAINT [FK_TreatmentStep_Treatment] FOREIGN KEY([TreatmentId])
REFERENCES [dbo].[Treatment] ([TreatmentId])
GO
ALTER TABLE [dbo].[TreatmentStep] CHECK CONSTRAINT [FK_TreatmentStep_Treatment]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([RoleId])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Role]
GO
USE [master]
GO
ALTER DATABASE [InfertilityTreatmentDB] SET  READ_WRITE 
GO
