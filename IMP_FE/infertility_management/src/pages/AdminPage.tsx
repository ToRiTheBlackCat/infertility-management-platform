import React, { useEffect, useState } from "react";
import {
    adminTreatmentBooking,
    fetchTreatmentRecord,
    fetchDoctor,
} from "../service/authService";
import {
    TreatmentRecord,
    TreatmentBookingData,
    DoctorData,
} from "../types/common";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import "../styles/AdminPage.css";

const AdminPage: React.FC = () => {
    const [treatmentBookingList, setTreatmentBookingList] = useState<TreatmentBookingData[]>([]);
    const [treatmentRecord, setTreatmentRecord] = useState<TreatmentRecord>();
    const [doctorList, setDoctorList] = useState<DoctorData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingRes = await adminTreatmentBooking(1, 100);
                if (bookingRes) {
                    setTreatmentBookingList(bookingRes.items || bookingRes);
                }

                const recordRes = await fetchTreatmentRecord(undefined, undefined, 10, 1);
                if (recordRes) {
                    setTreatmentRecord(recordRes);
                }

                const doctorRes = await fetchDoctor();
                if (doctorRes) {
                    setDoctorList(doctorRes);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartData = [
        { name: "Lịch Khám", count: treatmentBookingList.length },
        { name: "Bác Sĩ", count: doctorList.length },
        { name: "Hồ Sơ Điều Trị", count: treatmentRecord?.items?.length || 0 },
    ];

    const statsCards = [
        {
            title: "Tổng Lịch Khám",
            value: treatmentBookingList.length,
            icon: "📅",
            color: "#667eea",
            bgColor: "#f0f2ff"
        },
        {
            title: "Số Bác Sĩ",
            value: doctorList.length,
            icon: "👨‍⚕️",
            color: "#764ba2",
            bgColor: "#f5f0ff"
        },
        {
            title: "Hồ Sơ Điều Trị",
            value: treatmentRecord?.items?.length || 0,
            icon: "📋",
            color: "#f093fb",
            bgColor: "#fef7ff"
        }
    ];

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>🏥 Admin Dashboard</h1>
                <p>Tổng quan hệ thống quản lý bệnh viện</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                {statsCards.map((card, index) => (
                    <div key={index} className="stat-card" style={{ borderColor: card.color }}>
                        <div className="stat-icon" style={{ backgroundColor: card.bgColor }}>
                            {card.icon}
                        </div>
                        <div className="stat-content">
                            <h3>{card.value}</h3>
                            <p>{card.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="chart-section">
                <div className="section-header">
                    <h2>📊 Biểu Đồ Tổng Quan</h2>
                    <p>Thống kê tổng quan các hoạt động của hệ thống</p>
                </div>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fill: '#666', fontSize: 12 }}
                                axisLine={{ stroke: '#e0e0e0' }}
                            />
                            <YAxis 
                                allowDecimals={false} 
                                tick={{ fill: '#666', fontSize: 12 }}
                                axisLine={{ stroke: '#e0e0e0' }}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Bar 
                                dataKey="count" 
                                fill="url(#colorGradient)" 
                                barSize={60}
                                radius={[4, 4, 0, 0]}
                            />
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#667eea" />
                                    <stop offset="100%" stopColor="#764ba2" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Content Grid */}
            <div className="content-grid">
                {/* Treatment Records */}
                <div className="content-section">
                    <div className="section-header">
                        <h2>📋 Hồ Sơ Điều Trị</h2>
                        <span className="badge">{treatmentRecord?.items?.length || 0} hồ sơ</span>
                    </div>
                    <div className="section-content">
                        {treatmentRecord?.items?.length ? (
                            <div className="records-list">
                                {treatmentRecord.items.map((record, index) => (
                                    <div key={index} className="record-item">
                                        <div className="record-header">
                                            <span className="patient-name">
                                                👤 {record.patient.fullName}
                                            </span>
                                            <span className="booking-id">
                                                ID: {record.bookingId}
                                            </span>
                                        </div>
                                        <div className="record-dates">
                                            <span className="date-item">
                                                📅 Bắt đầu: {new Date(record.startDate).toLocaleDateString('vi-VN')}
                                            </span>
                                            <span className="date-item">
                                                📅 Kết thúc: {new Date(record.endDate).toLocaleDateString('vi-VN')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">📋</div>
                                <p>Chưa có hồ sơ điều trị nào</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Doctors */}
                <div className="content-section">
                    <div className="section-header">
                        <h2>👨‍⚕️ Danh Sách Bác Sĩ</h2>
                        <span className="badge">{doctorList.length} bác sĩ</span>
                    </div>
                    <div className="section-content">
                        {doctorList.length > 0 ? (
                            <div className="doctors-grid">
                                {doctorList.map((doc) => (
                                    <div key={doc.doctorId} className="doctor-card">
                                        <div className="doctor-avatar">
                                            {doc.gender === 'Male' ? '👨‍⚕️' : '👩‍⚕️'}
                                        </div>
                                        <div className="doctor-info">
                                            <h4>BS. {doc.fullName}</h4>
                                            <p className="doctor-degree">{doc.degree}</p>
                                            <span className="doctor-gender">
                                                {doc.gender === 'Male' ? '👨 Nam' : '👩 Nữ'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">👨‍⚕️</div>
                                <p>Chưa có dữ liệu bác sĩ</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;