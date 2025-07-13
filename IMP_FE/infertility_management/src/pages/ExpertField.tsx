import React, { useEffect, useState } from "react";
import {
  fetchExpertField,
  createExpertField,
  updateExpertField,
  deleteExpertField,
} from "../service/authService";
import { expertFieldData } from "../types/common";
import { Modal, Button, Form } from "react-bootstrap";

const ExperField: React.FC = () => {
  const [expertFieldList, setExpertFieldList] = useState<expertFieldData[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [newExpertName, setNewExpertName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const fetchData = async () => {
    const response = await fetchExpertField();
    if (response) {
      setExpertFieldList(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!newExpertName.trim()) return;
    const result = await createExpertField(newExpertName.trim());
    if (result) {
      setShowCreateModal(false);
      setNewExpertName("");
      fetchData();
    }
  };

  const handleUpdate = async () => {
    if (editingId === null || !editingName.trim()) return;
    const result = await updateExpertField(editingId, editingName.trim());
    if (result) {
      setShowUpdateModal(false);
      setEditingId(null);
      setEditingName("");
      fetchData();
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure to delete this expert field?")) {
      const result = await deleteExpertField(id);
      if (result) {
        fetchData();
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Expert Fields</h2>

      <Button
        variant="success"
        onClick={() => setShowCreateModal(true)}
        style={{ marginBottom: "20px" }}
      >
        ➕ Create New Expert Field
      </Button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {expertFieldList.map((field) => (
          <li
            key={field.expertFieldId}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>{field.expertFieldName}</span>
            <div style={{display: "flex"}}>
              <Button
                variant="warning"
                size="sm"
                onClick={() => {
                  setEditingId(field.expertFieldId);
                  setEditingName(field.expertFieldName);
                  setShowUpdateModal(true);
                }}
                style={{ marginRight: "10px" }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(field.expertFieldId)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Expert Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Expert Field Name</Form.Label>
            <Form.Control
              type="text"
              value={newExpertName}
              onChange={(e) => setNewExpertName(e.target.value)}
              placeholder="Enter expert field name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Expert Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Expert Field Name</Form.Label>
            <Form.Control
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              placeholder="Edit expert field name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExperField;
