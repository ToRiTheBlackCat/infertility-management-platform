import React, { useEffect, useState } from "react";
import {
    fetchDoctorSchedule,
    createDoctorSchedule,
    updateDoctorSchedule,
    deleteDoctorSchedule,
    fetchDoctor
} from "../service/authService";
import { DoctorData, DoctorScheduleData } from "../types/common";
import "../styles/ManagerDoctorSchedule.css";
import { toast } from "react-toastify";

const ManagerDoctorSchedule: React.FC = () => {
    const [doctorList, setDoctorList] = useState<DoctorData[]>([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
    const [schedule, setSchedule] = useState<DoctorScheduleData | null>(null);
    const [form, setForm] = useState<DoctorScheduleData>({
        doctorId: 0,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchDoctor();
            if (res) setDoctorList(res);
        };
        fetchData();
    }, []);

    const handleSelectDoctor = async (doctorId: number) => {
        setSelectedDoctorId(doctorId);
        const scheduleData = await fetchDoctorSchedule(doctorId);
        if (scheduleData) {
            setSchedule(scheduleData);
            setForm(scheduleData);
        } else {
            setSchedule(null);
            setForm({
                doctorId: doctorId,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            });
        }
    };

    const handleCheckboxChange = (day: keyof DoctorScheduleData) => {
        setForm(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    const handleCreate = async () => {
        if (!selectedDoctorId) return;
        const result = await createDoctorSchedule(selectedDoctorId, form);
        if (result === 200 || result === 201) {
            toast("Created successfully");
            const updated = await fetchDoctorSchedule(selectedDoctorId);
            setSchedule(updated);
        }
    };

    const handleUpdate = async () => {
        if (!selectedDoctorId) return;
        const result = await updateDoctorSchedule(selectedDoctorId, form);
        if (result === 200) {
            toast("Updated successfully");
            const updated = await fetchDoctorSchedule(selectedDoctorId);
            setSchedule(updated);
        }
    };

    const handleDelete = async () => {
        if (!selectedDoctorId) return;
        const confirm = window.confirm("Are you sure to delete this schedule?");
        if (!confirm) return;
        const result = await deleteDoctorSchedule(selectedDoctorId);
        if (result === 204) {
            toast("Deleted successfully");
            setSchedule(null);
            setForm({
                doctorId: selectedDoctorId,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            });
        }
    };

    const days = [
        { key: 'monday', label: 'Thứ Hai' },
        { key: 'tuesday', label: 'Thứ Ba' },
        { key: 'wednesday', label: 'Thứ Tư' },
        { key: 'thursday', label: 'Thứ Năm' },
        { key: 'friday', label: 'Thứ Sáu' },
        { key: 'saturday', label: 'Thứ Bảy' },
        { key: 'sunday', label: 'Chủ Nhật' },
    ];

    return (
        <div className="schedule-manager">
            <div className="header">
                <h2>Quản Lý Lịch Làm Việc Bác Sĩ</h2>
                <p>Chọn bác sĩ và thiết lập lịch làm việc trong tuần</p>
            </div>

            <div className="doctor-selection">
                <label className="form-label">Chọn Bác Sĩ</label>
                <select
                    className="form-select"
                    onChange={(e) => handleSelectDoctor(Number(e.target.value))}
                    defaultValue=""
                >
                    <option disabled value="">-- Chọn Bác Sĩ --</option>
                    {doctorList.map(doc => (
                        <option key={doc.doctorId} value={doc.doctorId}>
                            {doc.fullName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedDoctorId && (
                <div className="schedule-form">
                    <h3>Lịch Làm Việc</h3>
                    <div className="days-grid">
                        {days.map(day => (
                            <div key={day.key} className="day-checkbox">
                                <input
                                    type="checkbox"
                                    id={day.key}
                                    checked={form[day.key as keyof DoctorScheduleData] as boolean}
                                    onChange={() => handleCheckboxChange(day.key as keyof DoctorScheduleData)}
                                />
                                <label htmlFor={day.key}>
                                    <span className="checkmark"></span>
                                    {day.label}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="action-buttons">
                        {!schedule ? (
                            <button className="btn btn-create" onClick={handleCreate}>
                                <span>+</span> Tạo Lịch Làm Việc
                            </button>
                        ) : (
                            <>
                                <button className="btn btn-update" onClick={handleUpdate}>
                                    <span>✓</span> Cập Nhật Lịch
                                </button>
                                <button className="btn btn-delete" onClick={handleDelete}>
                                    <span>×</span> Xóa Lịch
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagerDoctorSchedule;