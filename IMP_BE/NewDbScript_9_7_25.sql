USE [master]
GO
/****** Object:  Database [InfertilityTreatmentDB]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[Appointment]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[BlogPost]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[Doctor]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[DoctorExpertField]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[DoctorSchedule]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[ExpertField]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[Feedback]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[Patient]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[Role]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[StepDetail]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[Treatment]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[TreatmentBooking]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[TreatmentRecord]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[TreatmentStep]    Script Date: 7/9/2025 11:35:02 AM ******/
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
/****** Object:  Table [dbo].[User]    Script Date: 7/9/2025 11:35:02 AM ******/
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
INSERT [dbo].[Appointment] ([AppointmentId], [BookingId], [Date], [PatientId], [Status], [Note]) VALUES (0, 1, CAST(N'2025-07-10T04:13:35.850' AS DateTime), 2, N'Đã hoàn thành                                     ', N'Khám sớm')
INSERT [dbo].[Appointment] ([AppointmentId], [BookingId], [Date], [PatientId], [Status], [Note]) VALUES (1, 1, CAST(N'2025-07-16T04:17:49.057' AS DateTime), 2, N'Đã hoàn thành                                     ', N'Khám trễ ')
INSERT [dbo].[Appointment] ([AppointmentId], [BookingId], [Date], [PatientId], [Status], [Note]) VALUES (2, 1, CAST(N'2025-07-20T04:13:35.850' AS DateTime), 2, N'Đã hoàn thành                                     ', N'Khám giấc chiều tầm 15h')
GO
SET IDENTITY_INSERT [dbo].[BlogPost] ON 

INSERT [dbo].[BlogPost] ([BlogPostId], [Image], [DoctorId], [PostTitle], [PostContent], [CreatedDate], [Viewers], [Status]) VALUES (1, N'treatments\fptu.jpg', 5, N'Understanding IVF: A Beginner\''s Guide', N'Explore the IVF process step by step and what to expect as a patient.', CAST(N'2025-08-07T00:00:00.000' AS DateTime), 6, N'valid                                             ')
INSERT [dbo].[BlogPost] ([BlogPostId], [Image], [DoctorId], [PostTitle], [PostContent], [CreatedDate], [Viewers], [Status]) VALUES (2, N'treatments\fptu.jpg', 8, N'IUI vs IVF: Which One is Right for You?', N'Compare two popular fertility treatments to make an informed decision.', CAST(N'2025-07-08T03:48:26.927' AS DateTime), 0, N'valid                                             ')
INSERT [dbo].[BlogPost] ([BlogPostId], [Image], [DoctorId], [PostTitle], [PostContent], [CreatedDate], [Viewers], [Status]) VALUES (3, N'treatments\fptu.jpg', 8, N'Boosting Male Fertility Naturally', N'Discover diet, lifestyle, and supplements that can improve sperm quality.', CAST(N'2025-07-08T03:50:21.617' AS DateTime), 4, N'valid                                             ')
INSERT [dbo].[BlogPost] ([BlogPostId], [Image], [DoctorId], [PostTitle], [PostContent], [CreatedDate], [Viewers], [Status]) VALUES (4, N'treatments\fptu.jpg', 5, N'Improving Egg Quality for Better IVF Results', N'Learn how to optimize egg health before undergoing IVF.', CAST(N'2025-07-08T03:53:07.767' AS DateTime), 1, N'valid                                             ')
INSERT [dbo].[BlogPost] ([BlogPostId], [Image], [DoctorId], [PostTitle], [PostContent], [CreatedDate], [Viewers], [Status]) VALUES (6, N'treatments\fptu.jpg', 12, N'Coping Emotionally During Infertility Treatment', N'Tips for managing stress, anxiety, and emotional challenges.', CAST(N'2025-07-05T00:00:00.000' AS DateTime), 2, N'valid                                             ')
INSERT [dbo].[BlogPost] ([BlogPostId], [Image], [DoctorId], [PostTitle], [PostContent], [CreatedDate], [Viewers], [Status]) VALUES (7, N'treatments\fptu.jpg', 5, N'Lifestyle Changes That Support Fertility', N'Simple adjustments to improve your chances of conception.', CAST(N'2025-07-06T00:00:00.000' AS DateTime), 0, N'valid                                             ')
INSERT [dbo].[BlogPost] ([BlogPostId], [Image], [DoctorId], [PostTitle], [PostContent], [CreatedDate], [Viewers], [Status]) VALUES (8, N'treatments\fptu.jpg', 8, N'What Affects IVF Success Rates?', N'Factors such as age, health, and clinic practices explained.', CAST(N'2025-07-07T00:00:00.000' AS DateTime), 3, N'valid                                             ')
SET IDENTITY_INSERT [dbo].[BlogPost] OFF
GO
INSERT [dbo].[Doctor] ([DoctorId], [AvatarImage], [FullName], [YearOfBirth], [PhoneNumber], [Gender], [Address], [Degree], [AverageScore], [Status]) VALUES (5, NULL, N'Dr.An', 1999, N'0567893212', N'Female    ', N'Vung Tau', N'bachelor', NULL, N'Valid                                             ')
INSERT [dbo].[Doctor] ([DoctorId], [AvatarImage], [FullName], [YearOfBirth], [PhoneNumber], [Gender], [Address], [Degree], [AverageScore], [Status]) VALUES (8, NULL, N'doctor2', 2000, N'0321312312', N'Male      ', N'Ho Chi Minh', N'bachelor', NULL, N'Valid                                             ')
INSERT [dbo].[Doctor] ([DoctorId], [AvatarImage], [FullName], [YearOfBirth], [PhoneNumber], [Gender], [Address], [Degree], [AverageScore], [Status]) VALUES (12, NULL, N'Dr.Tuan', 2000, N'0999888989', N'Male      ', N'Thu Duc', N'bachelor', NULL, N'Valid                                             ')
GO
INSERT [dbo].[DoctorExpertField] ([DoctorId], [ExpertFieldId]) VALUES (5, 1)
INSERT [dbo].[DoctorExpertField] ([DoctorId], [ExpertFieldId]) VALUES (8, 1)
INSERT [dbo].[DoctorExpertField] ([DoctorId], [ExpertFieldId]) VALUES (12, 1)
GO
INSERT [dbo].[DoctorSchedule] ([DoctorId], [Monday], [Tuesday], [Wednesday], [Thursday], [Friday], [Saturday], [Sunday]) VALUES (5, 1, 0, 1, 0, 1, 0, 0)
INSERT [dbo].[DoctorSchedule] ([DoctorId], [Monday], [Tuesday], [Wednesday], [Thursday], [Friday], [Saturday], [Sunday]) VALUES (8, 0, 1, 0, 1, 0, 1, 0)
INSERT [dbo].[DoctorSchedule] ([DoctorId], [Monday], [Tuesday], [Wednesday], [Thursday], [Friday], [Saturday], [Sunday]) VALUES (12, 1, 0, 0, 1, 0, 1, 1)
GO
INSERT [dbo].[ExpertField] ([ExpertFieldId], [ExpertFieldName]) VALUES (1, N'Sản phụ khoa (Obstetrics and Gynecology)')
GO
INSERT [dbo].[Feedback] ([PatientId], [BookingId], [TreatmentId], [TreatmentScore], [DoctorScore], [TreatmentComment], [CreateDate]) VALUES (2, 1, 1, 9, 8, N'Có hiệu quả, đáng để trải nghiệm', CAST(N'2025-07-09T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[Patient] ([PatientId], [FullName], [DateOfBirth], [Gender], [PhoneNumber], [Address]) VALUES (1, N'Patient456', CAST(N'1975-06-30' AS Date), N'Female    ', N'0898989898', N'HCM')
INSERT [dbo].[Patient] ([PatientId], [FullName], [DateOfBirth], [Gender], [PhoneNumber], [Address]) VALUES (2, N'Patient123', CAST(N'2025-07-08' AS Date), N'Female    ', N'0123123123', N'HCM')
INSERT [dbo].[Patient] ([PatientId], [FullName], [DateOfBirth], [Gender], [PhoneNumber], [Address]) VALUES (13, N'Patient999', CAST(N'2000-01-01' AS Date), N'Female    ', N'0444555666', N'HaNoi')
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (1, N'Admin                         ')
INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (2, N'Manager                       ')
INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (3, N'Doctor                        ')
INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (4, N'Patient                       ')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
INSERT [dbo].[StepDetail] ([StepId], [AppointmentId], [Description], [Status]) VALUES (1, 1, N'Thăm khám', N'Đã hoàn thành                                     ')
INSERT [dbo].[StepDetail] ([StepId], [AppointmentId], [Description], [Status]) VALUES (2, 1, N'Tiến hành liệu trình', N'Đã hoàn thành                                     ')
GO
SET IDENTITY_INSERT [dbo].[Treatment] ON 

INSERT [dbo].[Treatment] ([TreatmentId], [TreatmentName], [Description], [RatingScore], [Image], [ExpertFieldId]) VALUES (1, N'IUI (Intrauterine Insemination)', N'IUI là viết tắt của “Intrauterine Insemination” hay còn gọi là “thụ tinh nhân tạo”, đây là một kỹ thuật điều trị hiếm muộn có lịch sử lâu đời. Với phương pháp này, việc thụ tinh sẽ diễn ra trong cơ thể người mẹ. Những tinh trùng tốt nhất sẽ được chọn lọc, sau đó tiến hành bơm tinh trùng vào buồng tử cung của người phụ nữ ở thời điểm rụng trứng. \nNhững tinh trùng tốt nhất sẽ được chọn lọc, sau đó tiến hành bơm tinh trùng vào buồng tử cung của người phụ nữ ở thời điểm rụng trứng.\nTỷ lệ thành công của phương pháp bơm tinh trùng vào buồng tử cung trung bình không cao.\nTỷ lệ thành công của IUI còn phụ thuộc vào rất nhiều yếu tố khác, trong đó, 5 yếu tố tiên quyết là:\n1. Độ tuổi của người vợ\nCác nghiên cứu đã chứng minh chức năng sinh sản của phụ nữ sẽ giảm dần theo độ tuổi, kéo theo đó là tỷ lệ có thai cũng giảm theo. Phụ nữ ở độ tuổi dưới 25 có tỷ lệ mang thai cao nhất, chiếm khoảng 24%, sau đó sẽ giảm xuống còn 3.8 – 4.1% ở người trên 40 tuổi.\nNgay cả khi đã mang thai, việc giữ thai ở phụ nữ lớn tuổi cũng khó khăn hơn, cũng như tỷ lệ sảy thai và gặp biến chứng thai kỳ cũng cao hơn. Do đó, đối với các trường hợp điều trị vô sinh hiếm muộn ở phụ nữ trên 40 tuổi, các bác sĩ sẽ chỉ định các phương pháp hiệu quả khác thay cho IUI.\n2. Thời gian vô sinh – hiếm muộn\nThời gian vô sinh – hiếm muộn càng lâu thì hiệu quả của phương pháp IUI càng giảm. Phương pháp sẽ phát huy hiệu quả cao nhất ở trường hợp dưới 2 năm, giảm hiệu quả rõ rệt nếu sau 6 năm chung sống.\nChính vì thế, nếu các cặp vợ chồng đã kết hôn trên 1 năm, quan hệ tình dục bình thường 2 – 3 lần/tuần, không sử dụng các biện pháp tránh thai mà không có thai thì nên thăm khám càng sớm càng tốt để các phương pháp hỗ trợ sinh sản phát huy hiệu quả cao nhất.\n3. Chất lượng nang noãn và tình trạng tử cung ở người vợ\nChất lượng nang noãn và tình trạng tử cung sẽ ảnh hưởng rất nhiều đến kết quả của phương pháp thụ tinh nhân tạo. Để phương pháp đạt hiệu quả cao nhất, nội mạc tử cung người vợ phải đủ tốt và phải có 1-3 nang noãn đạt tiêu chuẩn về kích thước vào ngày kích thích rụng trứng.\nỞ những người vợ mắc bệnh lý lạc nội mạc tử cung nặng, ống dẫn trứng và mô buồng trứng có thể bị tổn thương gây khó khăn cho phương pháp IUI. Lúc này, phương pháp được ưu tiên sử dụng là thụ tinh trong ống nghiệm IVF.\n4. Chất lượng tinh trùng ở người chồng Mật độ tinh trùng trong tinh dịch, hình dạng và khả năng di động của tinh trùng góp phần không nhỏ vào kết quả điều trị vô sinh hiếm muộn bằng phương pháp IUI.\nCác nghiên cứu cho thấy, tỷ lệ thành công của IUI sẽ cao nếu mật độ và khả năng di động tốt và tổng số tinh trùng đảm bảo ở mức trên 5 triệu tinh trùng. Với những trường hợp tinh trùng yếu, sau lọc rửa vẫn chỉ đáp ứng dưới 5 triệu tinh trùng vẫn có thể xem xét sử dụng phương pháp IUI.\n5. Phác đồ điều trị và kinh nghiệm của bác sĩ điều trị\nMặc dù IUI là một thủ thuật đơn giản nhưng đòi hỏi phải có phác đồ điều trị phù hợp cho từng trường hợp, cũng như kinh nghiệm của bác sĩ điều trị…\nDo đó, các cặp vợ chồng vô sinh hiếm muộn nên tham khảo, chọn lựa cơ sở y tế uy tín có đội ngũ bác sĩ chuyên môn cao để việc điều trị đạt kết quả tốt nhất.', NULL, N'treatments\sport_skiing.jpg', 1)
INSERT [dbo].[Treatment] ([TreatmentId], [TreatmentName], [Description], [RatingScore], [Image], [ExpertFieldId]) VALUES (2, N'IVF (In Vitro Fertilization)', N'IVF là viết tắt của “In Vitro Fertilization” hay còn gọi là “thụ tinh trong ống nghiệm”, đây là một kỹ thuật điều trị vô sinh phổ biến hiện nay. Với phương pháp này, trứng được thụ tinh với tinh trùng để tạo thành phôi ở ngoài cơ thể người mẹ, cụ thể là ở phòng lab thụ tinh trong ống nghiệm.\nSau một quãng thời gian phôi được nuôi cấy và với quá trình chuẩn bị nội mạc tử cung phù hợp, phôi sẽ được chuyển lại vào tử cung của người phụ nữ để mang thai.\nCả người vợ và người chồng đều cần thực hiện một số xét nghiệm cơ bản và chuyên sâu để đánh giá về thể trạng sức khỏe và đặc biệt là chức năng sinh sản.\nBên cạnh đó, người vợ sẽ được thực hiện khám tiền mê để theo dõi phản ứng với thuốc gây mê, từ đó bác sĩ sẽ đánh giá người vợ có đủ điều kiện để thực hiện gây mê hay không. Đây là vấn đề quan trọng để đảm bảo thuận lợi cho quá trình chọc hút trứng.\nNếu cả người vợ và người chồng đều đáp ứng đủ điều kiện sức khỏe thì bác sĩ sẽ hẹn tái khám vào ngày thứ 2 của chu kỳ kinh kế tiếp. Thời gian này, các cặp vợ chồng nên nghỉ ngơi, giữ tâm lý vững vàng, chuẩn bị tài chính và thu xếp công việc để chuẩn bị chính thức bước vào làm IVF.\nNgoài việc tìm hiểu về quá trình làm IVF, nhiều mẹ bầu cũng rất quan tâm đến tỷ lệ thành công của phương pháp hỗ trợ sinh sản này.\nHiện nay không có con số chính xác về tỷ lệ thành công khi thực hiện IVF, vấn đề này phụ thuộc vào rất nhiều yếu tố như:\n- Tuổi tác hai vợ chồng: Các cặp vợ chồng có độ tuổi càng cao, nhất là người vợ thì khả năng sinh sản sẽ càng kém, cơ hội thực hiện IVF thành công cũng sẽ giảm dần.\n- Chế độ dinh dưỡng hợp lý: Nếu thực hiện bổ sung đầy đủ các loại dưỡng chất và hạn chế dùng chất kích thích thì cơ hội thụ tinh trong ống nghiệm thành công sẽ cao hơn.\n- Thói quen sinh hoạt lành mạnh cũng góp phần làm tăng cơ hội thụ thai thành công. Do đó, các cặp đôi nên thường xuyên vận động để nâng cao sức khỏe và luôn lạc quan, vui vẻ. Bên cạnh đó, nên hạn chế sinh hoạt tình dục trong thời gian này.\n- Nếu không mắc các bệnh phụ khoa thì cơ hội thụ thai thành công sẽ cao hơn.\n- Lựa chọn cơ sở y tế có đội ngũ bác sĩ chuyên môn cao và hệ thống máy móc hiện đại cũng là yếu tố quan trọng và có ảnh hưởng đến tỷ lệ thành công khi thực hiện IVF.', NULL, N'treatments\sport_skiing.jpg', 1)
INSERT [dbo].[Treatment] ([TreatmentId], [TreatmentName], [Description], [RatingScore], [Image], [ExpertFieldId]) VALUES (3, N'ICSI (Intra-Cytoplasmic Sperm Injection)', N'ICSI là viết tắt của “In Intra-Cytoplasmic Sperm Injection” hay còn gọi là “thụ tinh trong ống nghiệm”. Đây là phương pháp tiêm trực tiếp tinh trùng vào noãn để tạo phôi. Hiện nay ICSI là phương pháp hỗ trợ sinh sản được triển khai rộng rãi trên toàn thế giới với tỷ lệ thành công cao và được áp dụng trong nhiều chỉ định khác nhau trong điều trị vô sinh.\nNăm 1991, Gianpiero Palermo và cộng sự đã lần đầu thực hiện kỹ thuật ICSI, đây được xem là phương pháp hỗ trợ sinh sản dành cho những cặp vợ chồng vô sinh mà nguyên do đến từ yếu tố người chồng như OAT (tinh trùng ít, yếu và có dị dạng), nam giới vô tinh, chỉ có 1 vài con tinh trùng trong tinh dịch. Theo những dữ liệu được công bố, tỷ lệ sử dụng kỹ thuật ICSI năm 1997 là 39,6% và tăng lên 58,9% vào năm 2004. Cứ khoảng 1000 trẻ chào đời trên thế giới thì có 10 trẻ được sinh ra nhờ kỹ thuật này.', NULL, N'treatments\sport_skiing.jpg', 1)
INSERT [dbo].[Treatment] ([TreatmentId], [TreatmentName], [Description], [RatingScore], [Image], [ExpertFieldId]) VALUES (4, N'MESA (Micro Epididymal Sperm Aspiration)', N'MESA là viết tắt của Micro Epididymal Sperm Aspiration hay còn gọi là thủ thuật vi phẫu trích tinh trùng từ mào tinh. Cụ thể đây là quá trình thu thập tinh trùng thông qua việc sử dụng kính hiển vi phẫu thuật mở các ống nhỏ bên trong mào tinh hoàn để tìm kiếm tinh trùng. Sau khi bệnh nhân được vô cảm phù hợp, bác sĩ Nam khoa sẽ rạch da bìu, bộc lộ tinh hoàn – mào tinh ra bên ngoài. Dưới quan sát kính vi phẫu, bác sĩ sẽ chọn lựa và dùng kim chọc hút tinh trùng từ 1 ống mào tinh. Mẫu thu được sẽ được chuyển đến phòng xét nghiệm để xử lý và phục vụ cho thụ tinh ống nghiệm.\nThủ thuật này sẽ phát huy tác dụng trong điều kiện tinh trùng được sản xuất đủ số lượng tại tinh hoàn nhưng bị chặn lại bởi sự tắc nghẽn từ ống dẫn tinh trở đi, khiến các “tinh binh” không thể được xuất ra ngoài khi người đàn ông xuất tinh (vô tinh bế tắc). Nguyên nhân có thể do người bệnh không có ống dẫn tinh, tắc đường dẫn tinh do viêm nhiễm, do triệt sản, chấn thương,… Tỷ lệ thành công của thủ thuật MESA trong việc thu được tinh trùng chất lượng là 96-100%.\nKhi thực hiện MESA, để tăng tỷ lệ thụ tinh thành công, tinh trùng sau khi được chiết xuất sẽ được xử lý sàng lọc và tiêm trực tiếp vào trứng của người phụ nữ bằng kỹ thuật tiêm tinh trùng vào bào tương trứng (ICSI). Mặt khác, trong trường hợp nam giới chưa muốn có con ở thời điểm hiện tại nhưng vẫn muốn duy trì khả năng sinh sản sau này thì thủ thuật MESA cho phép bác sĩ lấy số lượng lớn tinh trùng và đông lạnh để sử dụng trong tương lai.\nTrong trường hợp không tìm thấy tinh trùng, cần phải kiểm tra sâu hơn bên trong tinh hoàn để tìm kiếm những tinh trùng còn sống bằng thủ thuật như TESE hoặc microTESE trong cùng thời điểm làm thủ thuật', NULL, N'treatments\sport_skiing.jpg', 1)
INSERT [dbo].[Treatment] ([TreatmentId], [TreatmentName], [Description], [RatingScore], [Image], [ExpertFieldId]) VALUES (5, N'IVM (In Vitro Maturation)', N'IVM viết tắt là In Vitro Maturation là kỹ thuật mà trong đó noãn được chọc hút ở giai đoạn chưa trưởng thành (giai đoạn túi mầm – GV hoặc Metaphase I – MI), được nuôi cấy trong môi trường chuyên biệt cho đến khi hoàn toàn trưởng thành (Metaphase II – MII). Các giai đoạn sau đó như tạo phôi, nuôi cấy phôi vẫn diễn ra như một chu kỳ thụ tinh trong ống nghiệm (IVF) thông thường. Có nghĩa là, đối với IVM thì việc kích thích buồng trứng là không cần thiết, hoặc chỉ cần kích thích nhẹ (sử dụng mồi – priming) với liều thấp trong thời gian ngắn, do đó nguy cơ quá kích buồng trứng là điều không thể xảy ra.\nKỹ thuật nuôi trứng non được đề cập lần đầu tiên bởi Pincus và Enzmann vào năm 1935, sau đó là Edwards vào năm 1969. Thành công đầu tiên của IVM được ghi nhận bởi Cha và cộng sự trong một báo cáo vào năm 1991, thực hiện IVM được thu nhận qua nội soi ở một phụ nữ tình nguyện hiến noãn. Hiện nay, ước tính số lượng em bé trên thế giới được sinh ra từ kỹ thuật này khoảng 2.500 bé.', NULL, N'treatments\sport_skiing.jpg', 1)
INSERT [dbo].[Treatment] ([TreatmentId], [TreatmentName], [Description], [RatingScore], [Image], [ExpertFieldId]) VALUES (17, N'TEST', N'TEST', NULL, N'treatments\sport_skiing.jpg', 1)
SET IDENTITY_INSERT [dbo].[Treatment] OFF
GO
SET IDENTITY_INSERT [dbo].[TreatmentBooking] ON 

INSERT [dbo].[TreatmentBooking] ([BookingId], [PatientId], [DoctorId], [TreatmentId], [Status], [CreatedDate]) VALUES (1, 2, 5, 17, N'Đã Hoàn Thành                                     ', CAST(N'2025-07-07' AS Date))
INSERT [dbo].[TreatmentBooking] ([BookingId], [PatientId], [DoctorId], [TreatmentId], [Status], [CreatedDate]) VALUES (2, 2, 5, 2, N'Đang chờ                                          ', CAST(N'2025-07-09' AS Date))
SET IDENTITY_INSERT [dbo].[TreatmentBooking] OFF
GO
INSERT [dbo].[TreatmentRecord] ([PatientId], [BookingId], [StartDate], [EndDate]) VALUES (2, 1, CAST(N'2025-07-07' AS Date), CAST(N'2025-07-20' AS Date))
GO
SET IDENTITY_INSERT [dbo].[TreatmentStep] ON 

INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (1, 1, N'Bước 1: Thăm khám ban đầu, kiểm tra sức khỏe hai vợ chồng\n
Hai vợ chồng được thăm khám ban đầu, tham gia một số xét nghiệm chuyên sâu cần thiết để xác định nguyên nhân hiếm muộn, nếu nguyên nhân hiếm muộn có thể giải quyết được bằng bơm tinh trùng và người bệnh đủ điều kiện để thực hiện, bác sĩ sẽ lên lịch và hướng dẫn bước điều trị tiếp theo.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (2, 1, N'Bước 2: Kích thích buồng trứng\n
Bác sĩ sẽ kê đơn thuốc kích thích buồng trứng nhằm tạo được từ 1- 3 trứng trưởng thành. Cụ thể:
\nThông thường người bệnh bắt đầu dùng thuốc (uống hoặc tiêm) từ ngày 2 – 3 của chu kỳ kinh nguyệt, và siêu âm 2 – 3 lần trong quá trình kích thích buồng trứng để theo dõi tình hình phát triển nang noãn, có phương án dự đoán chính xác ngày có thể đưa tinh trùng vào tử cung thuận lợi. Đến khi phát hiện nang noãn đã trưởng thành, người vợ được tiêm hCG để gây rụng trứng. Quá trình bơm tinh trùng thông thường sẽ được thực hiện sau 36 – 40 giờ kể từ mũi tiêm cuối cùng.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (3, 1, N'Bước 3: Lấy và lọc rửa mẫu tinh trùng\n
Vào ngày bơm tinh trùng vào buồng tử cung, người chồng sẽ lấy mẫu tinh trùng. Mẫu tinh trùng này cần tuân thủ đúng theo chỉ dẫn của bác sĩ, kiêng quan hệ tinh dục trong khoảng 2 – 3 ngày.
\nMẫu tinh dịch được lấy và chứa trong lọ chuyên dụng, thời gian lấy tinh dịch vào khoảng 2 giờ trước khi tiến hành IUI.\n
Lọc rửa tinh trùng được xem là bước vô cùng quan trọng, có ý nghĩa quyết định đến kết quả cuối cùng của phương pháp IUI. Quá trình này được tiến hành trong phòng Lab nhằm chọn ra những tinh trùng đạt chuẩn nhất, thúc đẩy quá trình thụ thai diễn ra thuận lợi hơn.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (4, 1, N'Bước 4: Bơm tinh trùng vào buồng tử cung\n
Khoảng 10 – 14 ngày tính từ ngày kích thích buồng trứng và sau 36 tiếng tiêm thuốc rụng trứng, tùy theo thể trạng người vợ mà tiến hành bơm tinh trùng vào buồng tử cung.\n
Người bệnh sẽ được nằm ở tư thế như khám phụ khoa thông thường. Tiếp đó, tinh trùng đã được lọc rửa được hút vào ống bơm, tiến hành bơm vào tử cung người vợ. Thời gian bơm tinh trùng vào tử cung diễn ra rất nhanh chóng, chỉ mất khoảng 5 phút là hoàn thành.\nSau khi bơm, người bệnh sẽ được nằm nghỉ ngơi một thời gian ngắn 15 – 30 phút. Đây là thủ thuật đơn giản, thường không gây khó chịu gì. Sau bơm người bệnh có thể cảm thấy một chút dịch chảy ra từ âm đạo, đó có thể là chất nhầy tạii cổ tử cung hoặc môi trường sử dụng để lau cổ tử cung.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (5, 1, N'Bước 5: Thử thai\n
Sau quy trình IUI khoảng 14 ngày, người vợ sẽ được thử thai và siêu âm thai để xác định kết quả thụ thai có thành công hay không. Nếu kết quả có thai, người vợ cần dưỡng thai theo lời khuyên của bác sĩ, cũng như tuân thủ chỉ định khám thai định kỳ để quá trình mang thai an toàn, khỏe mạnh.\n
Phương pháp thụ tinh nhân tạo tuy đơn giản nhưng bạn cần tham khảo và lựa chọn thực hiện ở cơ sở y tế uy tín, có chuyên khoa hỗ trợ sinh sản để quá trình chào đón con yêu diễn ra một cách an toàn nhất, giảm thiểu tối đa các nguy cơ không mong muốn.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (6, 2, N'Bước 1: Chuẩn bị\nCả người vợ và người chồng đều cần thực hiện một số xét nghiệm cơ bản và chuyên sâu để đánh giá về thể trạng sức khỏe và đặc biệt là chức năng sinh sản.\nBên cạnh đó, người vợ sẽ được thực hiện khám tiền mê để theo dõi phản ứng với thuốc gây mê, từ đó bác sĩ sẽ đánh giá người vợ có đủ điều kiện để thực hiện gây mê hay không. Đây là vấn đề quan trọng để đảm bảo thuận lợi cho quá trình chọc hút trứng.\nNếu cả người vợ và người chồng đều đáp ứng đủ điều kiện sức khỏe thì bác sĩ sẽ hẹn tái khám vào ngày thứ 2 của chu kỳ kinh kế tiếp. Thời gian này, các cặp vợ chồng nên nghỉ ngơi, giữ tâm lý vững vàng, chuẩn bị tài chính và thu xếp công việc để chuẩn bị chính thức bước vào làm IVF.\n')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (8, 2, N'Bước 2: Kích thích buồng trứng cho người vợ\nQuá trình tiêm thuốc để kích thích buồng trứng sẽ kéo dài khoảng 10 đến 12 ngày. Ở giai đoạn này, bác sĩ sẽ hẹn cụ thể lịch siêu âm, xét nghiệm máu để theo dõi chính xác tình trạng sức khỏe của nang noãn và nội mạc tử cung. Đến khi nang noãn đã đạt kích thước theo yêu cầu của bác sĩ, người vợ sẽ được tiêm mũi kích trứng. Mũi tiêm này rất quan trọng, cần thực hiện đúng giờ.\n')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (9, 2, N'Bước 3: Chọc hút trứng Được thực hiện vào khoảng 36 giờ từ khi tiêm mũi kích trứng cuối cùng. Trước khi thực hiện, bác sĩ sẽ tiến hành gây mê cho người vợ. Thông thường, chọc hút trứng sẽ diễn ra trong khoảng 10 đến 15 phút. Trong khi người vợ được chọc hút trứng, bác sĩ cũng sẽ tiến hành lấy mẫu tinh trùng tươi của người chồng hoặc rã đông mẫu tinh trùng đã được trữ lạnh từ trước. Khi bước chọc hút trứng đã hoàn thành, người vợ cần nằm viện để theo dõi sức khỏe trong vòng 2 đến 3 giờ.\n')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (10, 2, N'Bước 4: Tạo phôi Noãn sau khi chọc hút và tinh trùng sẽ được mang đến phòng Labo để thụ tinh và tạo phôi. Kỹ thuật viên sẽ thực hiện nuôi cấy phôi trong khoảng thời gian từ 2 đến 5 ngày trước khi chuyển đến buồng tử cung của người vợ. Đồng thời, bác sĩ sẽ báo cho cặp vợ chồng về số lượng cũng như chất lượng phôi.\n')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (11, 2, N'Bước 5: Chuyển phôi\nSau một thời gian được nuôi ở phòng Labo, nếu phôi đã đủ điều kiện, bác sĩ sẽ tiến hành chuyển phôi tươi. Nếu phôi đạt chất lượng được trữ đông và được chuyển vào chu kỳ sau thì được gọi là chuyển phôi đông lạnh. Trước khi chuyển phôi, bác sĩ cũng đã chỉ định cho người vợ uống thuốc và đặt thuốc âm đạo để đảm bảo niêm mạc tử cung đạt được độ dày cần thiết.\nQuá trình này chỉ diễn ra trong khoảng 5 đến 10 phút và người vợ có thể ra về ngay. Khoảng 2 tuần sau khi chuyển phôi, người vợ cần dùng thuốc nội tiết theo yêu cầu của bác sĩ.\n')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (13, 2, N'Bước 6: Thử thai Người vợ sẽ được thử thai bằng xét nghiệm Beta HCG. Nếu chỉ số này lớn hơn 25 U/L thì rất có thể phôi đã làm tổ trong tử cung. Sau đó, người vợ tiếp tục kiểm tra theo lịch hẹn của bác sĩ. Trường hợp chuyển phôi thất bại và đồng thời còn phôi lưu trữ, người vợ có thể tiếp tục chuyển phôi trong những chu kỳ tiếp theo.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (14, 3, N'Bước 1: Kích thích buồng trứng\nTùy vào tình trạng thăm khám trước đó, bác sĩ sẽ có phác đồ kích thích buồng trứng cá thể hóa từng bệnh nhân. Tùy vào tình trạng đáp ứng với thuốc kích thích buồng trứng, bệnh nhân sẽ có thời gian dùng thuốc khác nhau, thông thường từ khoảng 9-12 ngày. Bước này giúp gia tăng số lượng noãn thu được khi chọc hút, giúp tăng tỷ lệ tạo phôi.\nTrong giai đoạn bệnh nhân sử dụng thuốc kích thích buồng trứng sẽ được theo dõi sự phát triển của các nang noãn bằng việc thực hiện các xét nghiệm nội tiết có trong máu và siêu âm qua ngã âm đạo.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (15, 3, N'Bước 2: Chọc hút noãn\nĐây là thủ thuật lấy noãn khỏi buồng trứng của người phụ nữ. Khi làm thủ thuật, người phụ nữ sẽ được gây mê trước khi chọc hút, sau đó bác sĩ sẽ sử dụng siêu âm đầu dò để quan sát buồng trứng và dùng một kim nhỏ để hút phần dịch nang chứa noãn ra ngoài')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (16, 3, N'Bước 3: Chuẩn bị tinh trùng\nThông thường trong ngày vợ thực hiện chọc hút, chồng sẽ tiến hành lấy mẫu tinh dịch tươi tại bệnh viện, hoặc với trường hợp chồng cần làm thủ thuật tìm tinh trùng cũng có thể được tiến hành cùng ngày chọc hút của người vợ để có tạo phôi. Trong trường hợp chồng không có mặt tại thời điểm lấy noãn, người có tiền sử khó xuất tinh hoặc sử dụng tinh trùng hiến tặng, thì mẫu tinh sẽ được trữ lạnh trước đó. Sau khi có mẫu, tinh trùng sẽ được xử lý theo quy trình để chọn lựa tinh trùng tốt về cả hình thái và chất lượng.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (17, 3, N'Bước 4: Tiêm tinh trùng vào bào tương noãn\nHai giờ sau chọc hút, các tế bào bên ngoài của noãn đã được loại bỏ đề chọn lấy noãn trưởng thành, sau đó từng tinh trùng sẽ được tiêm vào noãn bằng kim ICSI. Đây là phương pháp phổ biến hiện nay trong điều trị vô sinh hiếm muộn. Tuy nhiên, để đạt được tỷ lệ tạo phôi tốt nhất cần chuyên viên phôi học có kinh nghiệm cùng trung tâm hỗ trợ sinh sản có đầu tư về trang thiết bị hiện đại.\nTrong kỹ thuật ICSI, noãn sẽ được hút nhẹ và cố định bởi kim giữ, mặt dưới của noãn sẽ chạm vào đáy đĩa chích nhằm giữ vững noãn trong quá trình ICSI sao cho thể cực nằm ở vị trí phù hợp. Sau đó kim tiêm được hạ xuống, tinh trùng được đưa ra gần đầu kim tiêm, kim tiêm sẽ được đưa qua màng trong suốt đi qua khoang quanh noãn và vào màng bào tương. Sau khi tiêm tinh trùng hoàn tất, các noãn sẽ được chuyển qua môi trường nuôi cấy và cho vào tủ CO2 tri-gas ở 37 độ C.\nKhoảng 16-18 giờ sau ICSI, chuyên viên phôi học sẽ kiểm tra sự thụ tinh của noãn và tinh trùng. Những noãn thụ tinh sẽ được tiếp tục theo dõi để đánh giá hình thái và quá trình phân chia của phôi đến ngày 3, ngày 5.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (18, 3, N'Bước 5: Chuyển phôi\nTùy tình trạng của người phụ nữ, bác sĩ sẽ tư vấn chuyển phôi tươi hoặc phôi trữ. Trước khi chuyển phôi, bác sĩ sẽ thăm khám và tư vấn về kết quả nuôi phôi cũng như tư vấn về quy trình chuyển phôi. Tại IVFTA, chúng tôi khuyến khích nên chuyển 1 phôi để giảm tỷ lệ đa thai, hạn chế những biến chứng của đa thai.\nThủ thuật chuyển phôi được thực hiện qua ngã âm đạo dưới hướng dẫn của siêu âm ngã bụng. Bác sĩ sẽ dùng một mỏ vịt đặt vào âm đạo và vệ sinh cổ tử cung. Sau đó chuyên viên phôi học sẽ đưa phôi vào một vào một catheter nhỏ, chuyển cho bác sĩ đưa đầu catheter vào cổ tử cung và buồng tử cung để đặt phôi. Hầu hết người bệnh sẽ không có cảm giác đau khi phôi được chuyển vào buồng tử cung, sau thủ thuật người bệnh có thể ra về ngay.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (19, 3, N'Bước 6: Kỹ thuật hỗ trợ hoàng thể sau chuyển phôi\nSau khi chuyển phôi, bác sĩ sẽ sử dụng thuốc progesterone để làm tăng tỷ lệ phôi làm tổ sau khi được đưa vào buồng tử cung. Nếu có thai, bệnh nhân sẽ tái khám và có thể tiếp tục sử dụng thuốc theo chỉ định của bác sĩ.\nMột số tác dụng phụ có thể xảy ra khi dùng thuốc như: vết bầm tím và đau nhẹ tại chỗ tiêm, buồn nôn hay nôn, phản ứng dị ứng tạm thời, căng vú và tăng tiết dịch âm đạo, tâm trạng thất thường và mệt mỏi.\nTác dụng phụ nghiêm trọng nhất của việc kích thích buồng trứng là hội chứng quá kích buồng trứng (HCQKBT). Hội chứng này xảy ra ở 2 giai đoạn: giai đoạn sớm, từ 1 – 7 ngày sau khi chọc hút noãn (do sử dụng thuốc kích thích phóng noãn); và giai đoạn muộn, từ 7 – 15 ngày sau chọc hút (do nội tiết tố từ thai kỳ).\nHầu hết các triệu chứng của HCQKBT (buồn nôn hoặc căng bụng) là nhẹ và thường biến mất trong vài ngày sau khi chọc hút mà không cần điều trị. Các trường hợp nặng chỉ chiếm đến một tỷ lệ rất nhỏ phụ nữ làm IVF, khoảng 0,3% của tất cả các chu kỳ điều trị (Kupka, 2014). Trong một số trường hợp nghiêm trọng, HCQKBT có thể gây ra một lượng lớn dịch tích tụ trong bụng và phổi, buồng trứng tăng kích thước, mất nước, khó thở và đau bụng dữ dội. Ngoài ra, HCQKBT có thể gây thuyên tắc và suy thận ở một tỷ lệ rất hiếm.\nTrong giai đoạn kích thích buồng trứng, việc theo dõi sự phát triển của nang noãn được thực hiện bằng các xét nghiệm nội tiết trong máu và siêu âm ngã âm đạo định kỳ. Việc theo dõi giúp bác sĩ xác định liều lượng thuốc và thời gian chọc hút noãn thích hợp.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (20, 4, N'Bước 1: Chuẩn bị\nNgày trước khi thực hiện thủ thuật:\n\t+Ăn thức ăn nhẹ, dễ tiêu vào cữ tối trước 18h cùng ngày.\n\t+Có thể uống nước đến trước 23h đêm\n\tVệ sinh cá nhân, tắm rửa sạch sẽ đặc biệt là vùng bìu bằng xà phòng\n\tNgủ sớm và ngủ đủ giấc\nNgày nhập viện thực hiện thủ thuật\n\tNgừng ăn và uống nước trước khi thực hiện thủ thuật khoảng 6-8 giờ. Đây là lưu ý đặc biệt quan trọng giúp giảm thiểu nguy cơ hít sặc có thể xảy ra trong quá trình thực hiện thủ thuật dấn đến nguy cơ tử vong\n\tKhông sử dụng nước hoa vào ngày thực hiện thủ thuật\n\tKhông mang tiền, tư trang có giá trị vào phòng thủ thuật và tháo răng giả (nếu có)\n\tVệ sinh cá nhân và vùng bìu sạch sẽ bằng xà phòng trước khi đến bệnh viện\n\t Thay trang phục theo hướng dẫn của nhân viên y tế')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (21, 4, N'Bước 2: Trước thủ thuật\n\t\t+Đặt bệnh nhân nằm đúng tư thế và gây mê toàn thân hoặc gây tê tủy sống\n\t\tSát trùng bộ phận sinh dục, vùng bẹn, đùi và khu vực tầng sinh môn')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (22, 4, N'Bước 3: Trong thủ thuật\n\t\tMở đường rạch nhỏ khoảng 1cm để bộc lộ mào tinh chứ không bộc lộ tinh hoàn.\n\t\tThao tác vi phẫu qua kính hiển vi để có hình ảnh rõ nét nhất và hút tinh trùng từ mào tinh, sau đó chuyển đến phòng Lab')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (23, 4, N'Bước 4: Hậu thủ thuật\n\t\tPhòng Lab sau khi nhận mẫu tinh dịch sẽ thực hiện sàng lọc và tìm những tinh trùng chất lượng\n\t\tNếu có sẽ tiến hành trữ đông để chuẩn bị làm ICSI hoặc trữ đông để bảo vệ khả năng sinh sản theo mong muốn của bệnh nhân
\n\t\tKết thúc quá trình, bác sĩ tiến hành cầm máu và đóng da bìu cho bệnh nhân\n\t\tNhững tinh trùng chất lượng được thu nhận và sàng lọc sau phương pháp MESA sẽ được bảo quản theo mong muốn của bệnh nhân.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (24, 5, N'Bước 1: Chuẩn bị\nBệnh nhân được theo dõi qua siêu âm và chọn lựa thời điểm để tiến hành chọc hút lấy noãn. Có hai yếu tố đóng vai trò quyết định đến thời điểm chọc hút noãn là kích thước nang noãn và độ dày của nội mạc tử cung.\nCác chuyên gia đã thực hiện một số nghiên cứu, thay đổi một số công đoạn trong quy trình IVM nhằm cải thiện số lượng và chất lượng noãn thu nhận bằng cách kết hợp sử dụng liều thấp FSH/hMG vào thời điểm đầu hoặc cuối pha nang noãn, hoặc sử dụng hCG trước khi thực hiện chọc hút noãn')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (25, 5, N'Bước 2: Chọc hút noãn non\nViệc chọc hút noãn được thực hiện vào khoảng 36 – 40 giờ sau tiêm hCG. Vì nang có kích thước rất nhỏ (chỉ khoảng 10mm), buồng trứng nhỏ, mô đệm nhiều, đặc và di động nhiều, cũng như một số điểm khác biệt trong kỹ thuật thực hiện, dẫn đến việc chọc hút noãn non sẽ khó thực hiện hơn so với chọc hút lấy noãn trưởng thành.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (26, 5, N'Bước 3: Thu nhận tinh trùng\nNoãn sẽ được nuôi trưởng thành trong vòng 24 – 26 giờ. Tuy nhiên, ghi nhận một số trường hợp ngay sau quá trình chọc hút đã phát hiện một số noãn trưởng thành, cho nên việc lấy tinh trùng ở người chồng sẽ được tiến hành đồng thời cùng lúc chọc hút noãn ở người vợ như quá trình IVF đơn thuần. Cách lấy tinh trùng sẽ được thực hiện tương tự như các trường hợp IVF đơn thuần, hoặc sẽ tiến hành phẫu thuật lấy tinh trùng (PESA, TESE) nếu cần thiết.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (27, 5, N'Bước 4: Nuôi trúng trưởng thành (IVM)\nMôi trường nuôi cấy trứng non được bổ sung các gonadotropin, steroid, yếu tố tăng trưởng, huyết thanh và protein từ nhiều nguồn. Thời gian nuôi trứng non trưởng thành là khoảng 28-52 giờ. Trứng trưởng thành trong vòng 30 giờ sau thu nhận được ghi nhận là phát triển tốt hơn các trứng trưởng thành lâu hơn.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (28, 5, N'Bước 5: Thụ tinh\nTiến hành tiêm tinh trùng vào bào tương trứng (ICSI) sau khi IVM, có thể áp dụng cho cả trường hợp tinh trùng có thông số phân tích bình thường hoặc bất thường.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (29, 5, N'Bước 6: Chuyển phôi\nThông thường việc thực hiện chuyển phôi IVM vào ngày 2 hoặc ngày 3 sau thụ tinh noãn với tinh trùng (tức là phôi đang ở giai đoạn phân chia).')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (30, 5, N'Bước 7: Chuẩn bị nội mạc tử cung và hỗ trợ hoàng thể\nChuẩn bị nội mạc tử cung đóng vai trò quan trọng trong kỹ thuật IVM nhằm đồng hộ hóa giai đoạn phát triển của phôi với sự phát triển của nội mạc tử cung. Ở phương pháp này, không có sự phát triển nang noãn như bình thường, dẫn đến nội mạc tử cung không tiếp xúc được với estradiol và progesterone đầy đủ như chu kỳ có sự phát triển của nang noãn.\nThêm vào đó, nội mạc tử cung ở những bệnh nhân mắc hội chứng buồng trứng đa nang thường tiếp xúc với các dạng estrogen khác nhau, có nồng độ khác nhau, tính cường estrogen tương đối, thiếu tiếp xúc với progesterone do không phóng noãn của buồng trứng, thường đi kèm các bệnh lý ở nội mạc tử cung như tăng sinh nội mạc tử cung… Do đó, việc chuẩn bị nội mạc tử cung và hỗ trợ hoàng thể sẽ tạo ra một môi trường nội tiết thuận lợi, gây các biến đổi mô học trên nội mạc tử cung như trong giai đoạn “cửa sổ làm tổ của phôi” chính là chìa khóa cho sự thành công trong làm tổ của phôi IVM vào nội mạc tử cung.\nViệc chuẩn bị nội mạc tử cung và hỗ trợ hoàng thể được thực hiện bằng cách sử dụng nội tiết ngoại sinh, phối hợp cùng estradiol đường uống và progesterone đường âm đạo.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (31, 5, N'Bước 8: Mang thai và sinh con\nThống kê cho thấy, tỷ lệ noãn chọc hút được vào khoảng 50%, tỷ lệ thụ thai vào khoảng 20-33%, trường hợp nuôi được đến phôi nang thì tỷ lệ có thai sẽ lên đến 54%. Tỷ lệ thành công của IVM ngày càng được nâng cao và những lợi ích mà IVM đem lại cho bệnh nhân rất lớn như giảm được chi phí điều trị, giảm liều thuốc sử dụng, cũng như giảm thiểu được nguy cơ quá kích buồng trứng.')
INSERT [dbo].[TreatmentStep] ([StepId], [TreatmentId], [Description]) VALUES (38, 17, N'Test Step')
SET IDENTITY_INSERT [dbo].[TreatmentStep] OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([UserId], [Email], [Password], [RefreshToken], [RefreshTokenExpirity], [CreatedDate], [RoleId], [IsActive]) VALUES (1, N'patient456_IMP@gmail.com', N'83d4536114b0c317a3e63709a2ad844b1b28981f10c8fecc4dfab7299567c145', N'25HAAx35C2YkQaSupolrL4zD3PTkJn9nOShh2JPgGig=', CAST(N'2025-07-07T07:05:47.847' AS DateTime), CAST(N'2025-06-30T00:00:00.000' AS DateTime), 4, 1)
INSERT [dbo].[User] ([UserId], [Email], [Password], [RefreshToken], [RefreshTokenExpirity], [CreatedDate], [RoleId], [IsActive]) VALUES (2, N'patient123_IMP@gmail.com', N'83d4536114b0c317a3e63709a2ad844b1b28981f10c8fecc4dfab7299567c145', N'FH6pl9vWTwOYkubcHrNNNmWR7zmrUJtI+g4ghI7jR90=', CAST(N'2025-07-15T04:27:32.417' AS DateTime), CAST(N'2025-06-30T13:50:01.790' AS DateTime), 4, 1)
INSERT [dbo].[User] ([UserId], [Email], [Password], [RefreshToken], [RefreshTokenExpirity], [CreatedDate], [RoleId], [IsActive]) VALUES (5, N'doctor123_IMP@gmail.com', N'83d4536114b0c317a3e63709a2ad844b1b28981f10c8fecc4dfab7299567c145', N'764Hz8iOAQQjGOsC21GxdB2CeCFaCu3t6KN23Id7T70=', CAST(N'2025-07-16T03:34:20.780' AS DateTime), CAST(N'2025-06-30T14:11:39.190' AS DateTime), 3, 1)
INSERT [dbo].[User] ([UserId], [Email], [Password], [RefreshToken], [RefreshTokenExpirity], [CreatedDate], [RoleId], [IsActive]) VALUES (6, N'admin_IMP@gmail.com', N'83d4536114b0c317a3e63709a2ad844b1b28981f10c8fecc4dfab7299567c145', N'x7fOk4CFXzayuszokHEEJJpfNDWhKb+7OzRcDxFneBo=', CAST(N'2025-07-13T09:38:25.570' AS DateTime), CAST(N'2025-06-30T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[User] ([UserId], [Email], [Password], [RefreshToken], [RefreshTokenExpirity], [CreatedDate], [RoleId], [IsActive]) VALUES (7, N'manager_IMP@gmail.com', N'83d4536114b0c317a3e63709a2ad844b1b28981f10c8fecc4dfab7299567c145', N'vP8mVvfvuQWD+BJ8Oi5Dse8MFSyhS31gOn7KdHvqCK8=', CAST(N'2025-07-13T10:08:12.150' AS DateTime), CAST(N'2025-06-30T00:00:00.000' AS DateTime), 2, 1)
INSERT [dbo].[User] ([UserId], [Email], [Password], [RefreshToken], [RefreshTokenExpirity], [CreatedDate], [RoleId], [IsActive]) VALUES (8, N'doctor456_IMP@gmail.com', N'83d4536114b0c317a3e63709a2ad844b1b28981f10c8fecc4dfab7299567c145', NULL, NULL, CAST(N'2025-06-30T14:20:43.697' AS DateTime), 3, 1)
INSERT [dbo].[User] ([UserId], [Email], [Password], [RefreshToken], [RefreshTokenExpirity], [CreatedDate], [RoleId], [IsActive]) VALUES (12, N'doctor999_IMP@gmail.com', N'83d4536114b0c317a3e63709a2ad844b1b28981f10c8fecc4dfab7299567c145', NULL, NULL, CAST(N'2025-09-07T00:00:00.000' AS DateTime), 3, 1)
INSERT [dbo].[User] ([UserId], [Email], [Password], [RefreshToken], [RefreshTokenExpirity], [CreatedDate], [RoleId], [IsActive]) VALUES (13, N'patient999_IMP@gmail.com', N'83d4536114b0c317a3e63709a2ad844b1b28981f10c8fecc4dfab7299567c145', NULL, NULL, CAST(N'2025-08-09T00:00:00.000' AS DateTime), 4, 1)
SET IDENTITY_INSERT [dbo].[User] OFF
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
