import React, { useEffect, useState } from "react";
import { fetchPatientTreatmentBooking, cancelBooking, createFeedback } from "../service/authService";
import { TreatmentBookingData } from "../types/common";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const BookingAppointment: React.FC = () => {
    const [bookingAppointment, setBookingAppointment] = useState<TreatmentBookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<TreatmentBookingData | null>(null);
    const patientId = Number(useSelector((state: RootState) => state.user.userId));
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({
        treatmentScore: 0,
        doctorScore: 0,
        treatmentComment: ""
    });

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
                setLoading(true);
                if (patientId) {
                    const bookingAppointmentData = await fetchPatientTreatmentBooking(patientId);
                    if (bookingAppointmentData) {
                        setBookingAppointment(bookingAppointmentData);
                    }
                }
            } catch (error) {
                console.error("Error fetching booking data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [patientId]);
    const handleCancel = async (bookingId: number) => {
        try {
            const res = await cancelBooking(bookingId);
            if (res === 200) alert("Booking cancelled successfully.");
        } catch (err) {
            console.error("Cancel failed", err);
            alert("Failed to cancel booking");
        }
    };
    const handleOpenFeedback = (booking: TreatmentBookingData) => {
        setSelectedBooking(booking);
        setShowFeedbackForm(true);
    };
    const handleSubmitFeedback = async () => {
        if (!selectedBooking) return;
        try {
            const res = await createFeedback(
                selectedBooking.bookingId,
                patientId,
                selectedBooking.treatment.treatmentId,
                feedback.treatmentScore,
                feedback.doctorScore,
                feedback.treatmentComment,
                new Date()
            );
            console.log(res)
            if (res) toast("Feedback submitted successfully");
        } catch (err) {
            console.error("Submit feedback error", err);
        } finally {
            setShowFeedbackForm(false);
            setFeedback({ treatmentScore: 0, doctorScore: 0, treatmentComment: "" });
            setSelectedBooking(null);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status.trim().toLowerCase()) {
            case 'đã hoàn thành':
                return styles.statusCompleted;
            case 'đã huỷ':
            case 'cancelled':
                return styles.statusCancelled;
            case 'đã xác nhận':
            case 'confirmed':
                return styles.statusConfirmed;
            case 'chờ xác nhận':
            case 'pending':
                return styles.statusPending;
            default:
                return styles.statusPending;
        }
    };

    const handleRowHover = (e: React.MouseEvent<HTMLTableRowElement>) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
    };

    const handleRowLeave = (e: React.MouseEvent<HTMLTableRowElement>) => {
        e.currentTarget.style.backgroundColor = 'white';
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={styles.header}>
                    <h2 style={styles.title}>My Bookings</h2>
                    <p style={styles.subtitle}>
                        {bookingAppointment.length > 0
                            ? `${bookingAppointment.length} appointment${bookingAppointment.length > 1 ? 's' : ''} found`
                            : 'Your appointment history'}
                    </p>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loadingContainer}>
                            <div style={styles.spinner}></div>
                            <p style={styles.loadingText}>Loading your appointments...</p>
                        </div>
                    ) : bookingAppointment.length === 0 ? (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIcon}>📅</div>
                            <h3 style={styles.emptyTitle}>No bookings found</h3>
                            <p style={styles.emptyText}>
                                You haven't made any appointments yet. Book your first appointment to get started!
                            </p>
                        </div>
                    ) : (
                        <div style={styles.tableContainer}>
                            <table style={styles.table}>
                                <thead style={styles.tableHeader}>
                                    <tr>
                                        <th style={styles.th}>#</th>
                                        <th style={styles.th}>Treatment Name</th>
                                        <th style={styles.th}>Doctor Name</th>
                                        <th style={styles.th}>Status</th>
                                        <th style={{ ...styles.th, ...styles.thLast }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody style={styles.tbody}>
                                    {bookingAppointment.map((booking, index) => (
                                        <tr
                                            key={index}
                                            style={styles.tr}
                                            onMouseEnter={handleRowHover}
                                            onMouseLeave={handleRowLeave}
                                        >
                                            <td style={{ ...styles.td, ...styles.indexCell }}>{index + 1}</td>
                                            <td style={{ ...styles.td, ...styles.treatmentName }}>
                                                {booking.treatment.treatmentName}
                                            </td>
                                            <td style={{ ...styles.td, ...styles.doctorName }}>
                                                {booking.doctor.fullName}
                                            </td>
                                            <td style={styles.td}>
                                                <span style={{
                                                    ...styles.statusBadge,
                                                    ...getStatusStyle(booking.status)
                                                }}>
                                                    {booking.status.trim()}
                                                </span>
                                            </td>
                                            <td style={{ ...styles.td, ...styles.tdLast }}>
                                                <button
                                                    onClick={() => navigate(`/booking-detail/${booking.bookingId}`)}
                                                    style={{
                                                        marginRight: '10px',
                                                        padding: '6px 12px',
                                                        backgroundColor: '#667eea',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold'
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a67d8'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
                                                >
                                                    View
                                                </button>

                                                {booking.status.trim().toLowerCase() === 'đã hoàn thành' ? (
                                                    <button
                                                        onClick={() => handleOpenFeedback(booking)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            backgroundColor: '#38a169',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontWeight: 'bold'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2f855a'}
                                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#38a169'}
                                                    >
                                                        Feedback
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleCancel(booking.bookingId)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            backgroundColor: '#e53e3e',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontWeight: 'bold',
                                                            marginLeft: '5px'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c53030'}
                                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e53e3e'}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Feedback Form */}
            {showFeedbackForm && selectedBooking && (
                <div style={{
                    marginTop: '40px',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '30px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                    <h3 style={{ marginBottom: '20px', color: '#2d3748' }}>
                        Feedback for <span style={{ color: '#667eea' }}>{selectedBooking.treatment.treatmentName}</span>
                    </h3>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>Treatment Score:</label>
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={feedback.treatmentScore}
                            onChange={(e) =>
                                setFeedback((prev) => ({ ...prev, treatmentScore: Number(e.target.value) }))
                            }
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '6px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>Doctor Score:</label>
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={feedback.doctorScore}
                            onChange={(e) =>
                                setFeedback((prev) => ({ ...prev, doctorScore: Number(e.target.value) }))
                            }
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '6px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold' }}>Comment:</label>
                        <textarea
                            rows={4}
                            value={feedback.treatmentComment}
                            onChange={(e) =>
                                setFeedback((prev) => ({ ...prev, treatmentComment: e.target.value }))
                            }
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '6px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                            onClick={handleSubmitFeedback}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#667eea',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a67d8'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setShowFeedbackForm(false)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#e2e8f0',
                                color: '#2d3748',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <style>{`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
        </div>
    );

};

export default BookingAppointment;