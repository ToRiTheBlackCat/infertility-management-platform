import React, { useEffect, useState } from "react";
import { fetchDoctorTreatmentBooking, createTreatmentRecord, doneBooking } from "../service/authService";
import { DoctorAppointmentData } from "../types/common";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorAppointment: React.FC = () => {
    const doctorId = useSelector((state: RootState) => Number(state.user.userId));
    const [doctorAppointment, setDoctorAppointment] = useState<DoctorAppointmentData[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        },
        innerContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            overflow: 'hidden'
        },
        header: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '30px 40px',
            textAlign: 'center' as const
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: '0',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        },
        subtitle: {
            fontSize: '1.1rem',
            opacity: 0.9,
            margin: '10px 0 0 0'
        },
        content: {
            padding: '40px'
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px'
        },
        spinner: {
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
        },
        loadingText: {
            fontSize: '1.1rem',
            color: '#666'
        },
        emptyState: {
            textAlign: 'center' as const,
            padding: '60px 20px',
            color: '#666'
        },
        emptyIcon: {
            fontSize: '4rem',
            marginBottom: '20px',
            opacity: 0.5
        },
        emptyTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '10px'
        },
        emptyText: {
            fontSize: '1.1rem',
            color: '#888'
        },
        tableContainer: {
            overflow: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse' as const,
            backgroundColor: 'white'
        },
        tableHeader: {
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderBottom: '2px solid #dee2e6'
        },
        th: {
            padding: '18px 20px',
            textAlign: 'left' as const,
            fontWeight: 'bold',
            color: '#495057',
            fontSize: '0.95rem',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px',
            borderRight: '1px solid #dee2e6'
        },
        thLast: {
            borderRight: 'none'
        },
        tbody: {
            backgroundColor: 'white'
        },
        tr: {
            borderBottom: '1px solid #f8f9fa',
            transition: 'background-color 0.2s ease'
        },
        td: {
            padding: '16px 20px',
            borderRight: '1px solid #f8f9fa',
            fontSize: '0.95rem',
            color: '#495057'
        },
        tdLast: {
            borderRight: 'none'
        },
        indexCell: {
            fontWeight: 'bold',
            color: '#667eea',
            width: '60px',
            textAlign: 'center' as const
        },
        treatmentName: {
            fontWeight: '600',
            color: '#2d3748'
        },
        doctorName: {
            color: '#4a5568',
            fontWeight: '500'
        },
        statusBadge: {
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px',
            display: 'inline-block'
        },
        statusConfirmed: {
            backgroundColor: '#d4edda',
            color: '#155724'
        },
        statusPending: {
            backgroundColor: '#fff3cd',
            color: '#856404'
        },
        statusCancelled: {
            backgroundColor: '#f8d7da',
            color: '#721c24'
        },
        statusCompleted: {
            backgroundColor: '#d1ecf1',
            color: '#0c5460'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDoctorTreatmentBooking(doctorId);
                console.log(response)
                if (response) {
                    setDoctorAppointment(response);
                }
            } catch (error) {
                console.error("Error fetching doctor appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [doctorId]);
    const handleFinishAppointment = async (bookingId: number) => {
        try {
            const res = await createTreatmentRecord(bookingId, doctorId);
            const done = await doneBooking(bookingId)
            console.log(res)
            if (res === 200 && done) {
                toast("Appointment finished successfully.");
                await fetchDoctorTreatmentBooking(doctorId);
            } else {
                toast.error("There are still unfinished appointments");
            }
        } catch (error) {
            console.error("Error finishing appointment:", error);
            alert("An error occurred while finishing the appointment.");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "confirmed":
                return styles.statusConfirmed;
            case "pending":
                return styles.statusPending;
            case "cancelled":
                return styles.statusCancelled;
            case "completed":
                return styles.statusCompleted;
            default:
                return styles.statusPending;
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Doctor Booking Appointments</h2>
                    <p style={styles.subtitle}>Manage your scheduled appointments</p>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loadingContainer}>
                            <div style={styles.spinner}></div>
                            <p style={styles.loadingText}>Loading appointments...</p>
                        </div>
                    ) : doctorAppointment.length === 0 ? (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIcon}>📭</div>
                            <h3 style={styles.emptyTitle}>No Appointments Found</h3>
                            <p style={styles.emptyText}>You have no appointments at the moment.</p>
                        </div>
                    ) : (
                        <div style={styles.tableContainer}>
                            <table style={styles.table}>
                                <thead style={styles.tableHeader}>
                                    <tr>
                                        <th style={{ ...styles.th, ...styles.indexCell }}>#</th>
                                        <th style={styles.th}>Patient</th>
                                        <th style={styles.th}>DOB</th>
                                        <th style={styles.th}>Treatment</th>
                                        <th style={styles.th}>Created Date</th>
                                        <th style={styles.th}>Status</th>
                                        <th style={{ ...styles.th, ...styles.thLast }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody style={styles.tbody}>
                                    {doctorAppointment.map((item, index) => (
                                        <tr key={index} style={styles.tr}>
                                            <td style={{ ...styles.td, ...styles.indexCell }}>{index + 1}</td>
                                            <td style={styles.td}>{item.patient.fullName}</td>
                                            <td style={styles.td}>
                                                {new Date(item.patient.dateOfBirth).toLocaleDateString()}
                                            </td>
                                            <td style={styles.td}>
                                                {item.treatment?.treatmentName || "N/A"}
                                            </td>
                                            <td style={styles.td}>
                                                {new Date(item.createdDate).toLocaleString()}
                                            </td>
                                            <td style={styles.td}>
                                                <span style={{
                                                    ...styles.statusBadge,
                                                    ...getStatusStyle(item.status)
                                                }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td style={{ ...styles.td, ...styles.tdLast }}>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/doctor-appointment-detail/${item.bookingId}`, {
                                                            state: {
                                                                createdDate: item.createdDate,
                                                                status: item.status,
                                                                note: item.treatment.treatmentName,
                                                                patientId: item.patientId
                                                            }
                                                        })
                                                    }
                                                    style={{
                                                        padding: '6px 12px',
                                                        backgroundColor: '#667eea',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold',
                                                        transition: 'background-color 0.2s',
                                                        marginRight: '10px'
                                                    }}
                                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5a67d8')}
                                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#667eea')}
                                                >
                                                    View
                                                </button>

                                                <button
                                                    onClick={() => handleFinishAppointment(item.bookingId)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        backgroundColor: '#28a745',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
                                                >
                                                    ✅ Finish
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default DoctorAppointment;
