import React, { useEffect, useState } from "react";
import {
    fetchTreatment,
    createTreatment,
    updateTreatment,
    fetchExpertField,
    deleteTreatment,
    fetchTreatmentById
} from "../service/authService";
import {
    TreatmentData,
    createTreatmentData,
    updateTreatmentData,
    expertFieldData
} from "../types/common";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ManagerTreatment: React.FC = () => {
    const [treatmentList, setTreatmentList] = useState<TreatmentData[]>([]);
    const [expertFieldList, setExpertFieldList] = useState<expertFieldData[]>([]);
    const [selectedTreatment, setSelectedTreatment] = useState<TreatmentData>();
    const [createForm, setCreateForm] = useState<createTreatmentData>({
        treatmentName: "",
        description: "",
        treatmentImage: {} as File,
        expertFieldId: 0
    });
    const [updateForm, setUpdateForm] = useState<updateTreatmentData>({
        treatmentName: "",
        description: "",
        expertFieldId: 0
    });
    const [selectedTreatmentId, setSelectedTreatmentId] = useState<number | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res1 = await fetchTreatment();
            const res2 = await fetchExpertField();
            if (res1) setTreatmentList(res1);
            if (res2) setExpertFieldList(res2);
        };
        fetchData();
    }, []);
    const handleViewDetail = async (id: number) => {
        const response = await fetchTreatmentById(id);
        if (response) {
            setSelectedTreatment(response);
            setShowDetailModal(true);
        }
    };

    const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as any;
        if (name === "treatmentImage") {
            setCreateForm({ ...createForm, treatmentImage: files[0] });
        } else {
            setCreateForm({ ...createForm, [name]: value });
        }
    };

    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdateForm({ ...updateForm, [name]: value });
    };

    const handleCreate = async () => {
        const result = await createTreatment(createForm);
        if (result===200) {
            toast("Created successfully!");
            setShowCreateModal(false);
            const newList = await fetchTreatment();
            if (newList) setTreatmentList(newList);
        }
    };

    const handleUpdate = async () => {
        if (!selectedTreatmentId) return;
        const result = await updateTreatment(updateForm, selectedTreatmentId);
        if (result===200) {
            toast("Updated successfully!");
            setShowUpdateModal(false);
            const newList = await fetchTreatment();
            if (newList) setTreatmentList(newList);
        }
    };
    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this treatment?");
        if (!confirmDelete) return;

        const result = await deleteTreatment(id);
        if (result===200) {
            toast("Deleted successfully!");
            const newList = await fetchTreatment();
            if (newList) setTreatmentList(newList);
        }
    };


    const openUpdateModal = (t: TreatmentData) => {
        setSelectedTreatmentId(t.treatmentId);
        setUpdateForm({
            treatmentName: t.treatmentName,
            description: t.description,
            expertFieldId: t.expertFieldId
        });
        setShowUpdateModal(true);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">🩺 Treatment Management</h2>

            <Button variant="success" onClick={() => setShowCreateModal(true)}>
                + Create Treatment
            </Button>

            <ul className="list-group mt-4">
                {treatmentList.map((treat) => (
                    <li key={treat.treatmentId} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{treat.treatmentName}</strong> - {treat.description.split('.')[0] + '.'}
                            <br />
                            Field: {treat.expertField?.expertFieldName}
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button variant="info" onClick={() => handleViewDetail(treat.treatmentId)}>
                                👁️ View
                            </Button>
                            <Button variant="warning" onClick={() => openUpdateModal(treat)}>
                                ✏️ Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(treat.treatmentId)}>
                                🗑️ Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>📝 Treatment Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTreatment ? (
                        <div>
                            <h5>{selectedTreatment.treatmentName}</h5>
                            <div>
                                {(selectedTreatment.description || "").split(/\\n|\n/).map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </div>
                            <p><strong>Rating Score:</strong> {selectedTreatment.ratingScore}</p>
                            <p><strong>Expert Field:</strong> {selectedTreatment.expertField?.expertFieldName}</p>
                            {selectedTreatment.image && (
                                <img
                                    src={selectedTreatment.image}
                                    alt="Treatment"
                                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                                />
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Create Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Treatment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            name="treatmentName"
                            placeholder="Treatment Name"
                            onChange={handleCreateChange}
                            className="mb-3"
                        />
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Description"
                            onChange={handleCreateChange}
                            className="mb-3"
                        />
                        <Form.Select
                            name="expertFieldId"
                            onChange={handleCreateChange}
                            className="mb-3"
                        >
                            <option value="">-- Select Expert Field --</option>
                            {expertFieldList.map(field => (
                                <option key={field.expertFieldId} value={field.expertFieldId}>
                                    {field.expertFieldName}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control
                            name="treatmentImage"
                            type="file"
                            onChange={handleCreateChange}
                            className="mb-3"
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleCreate}>Create</Button>
                </Modal.Footer>
            </Modal>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Treatment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            name="treatmentName"
                            value={updateForm.treatmentName}
                            onChange={handleUpdateChange}
                            className="mb-3"
                        />
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={updateForm.description}
                            onChange={handleUpdateChange}
                            className="mb-3"
                        />
                        <Form.Select
                            name="expertFieldId"
                            value={updateForm.expertFieldId}
                            onChange={handleUpdateChange}
                            className="mb-3"
                        >
                            <option value="">-- Select Expert Field --</option>
                            {expertFieldList.map(field => (
                                <option key={field.expertFieldId} value={field.expertFieldId}>
                                    {field.expertFieldName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManagerTreatment;
