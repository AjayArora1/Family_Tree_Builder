import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import './index.scss';

function App() {
    const [node, setNodeState] = useState([
        {
            id: 0,
            name: 'You',
            x: 0,
            y: 0,
            dateOfBirth: '1900-01-01',
            placeOfBirth: '',
            gender: 'M',
            isAlive: true,
            deathDate: null,
            photoUrl: '',
            notes: '',
            partnerId: null,
            children: []
        }
    ]);

    const [editingNode, setEditingNode] = useState(null); // For managing the node being edited

    const handleEditNode = (node) => {
        setEditingNode(node); // Open modal and set the node to be edited
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingNode((prevNode) => ({
            ...prevNode,
            [name]: value,
        }));
    };

    const saveNodeChanges = () => {
        setNodeState((prevNodes) =>
            prevNodes.map((node) =>
                node.id === editingNode.id ? editingNode : node
            )
        );
        setEditingNode(null); // Close modal after saving
    };

    const addNode = (position, id) => {
        const newId = Math.max(...node.map(node => node.id)) + 1;
        const currentNode = node.find(node => node.id === id);

        // ADDING PARENT BY CLICKING THE TOP BUTTON OF A NODE
        // ADDING PARENT BY CLICKING THE TOP BUTTON OF A NODE
        // ADDING PARENT BY CLICKING THE TOP BUTTON OF A NODE
        if (position === 'top') {
            const newIdMale = newId;
            const newIdFemale = newId + 1;

            const newFather = {
                id: newIdMale,
                name: currentNode.name + '\'s Father',
                x: currentNode.x - 1,
                y: currentNode.y - 1,
                dateOfBirth: 'Unknown',
                placeOfBirth: 'Unknown',
                gender: 'M',
                isAlive: true,
                deathDate: null,
                photoUrl: '',
                notes: 'No notes',
                partnerId: newIdFemale,
                children: [currentNode.id]
            };

            const newMother = {
                id: newIdFemale,
                name: currentNode.name + '\'s Mother',
                x: currentNode.x + 1,
                y: currentNode.y - 1,
                dateOfBirth: 'Unknown',
                placeOfBirth: 'Unknown',
                gender: 'F',
                isAlive: true,
                deathDate: null,
                photoUrl: '',
                notes: 'No notes',
                partnerId: newIdMale,
                children: [currentNode.id]
            };

            setNodeState(prev => [
                ...prev,
                newFather,
                newMother
            ]);

            setNodeState(prev =>
                prev.map(node =>
                    node.id === currentNode.id
                        ? { ...node, children: [newIdMale, newIdFemale] }
                        : node
                )
            );
        // ADDING SIBLING BY CLICKING THE LEFT/RIGHT BUTTON OF A NODE
        // ADDING SIBLING BY CLICKING THE LEFT/RIGHT BUTTON OF A NODE
        // ADDING SIBLING BY CLICKING THE LEFT/RIGHT BUTTON OF A NODE
        } else if (position === 'left' || position === 'right') {
            const newSibling = {
                id: newId,
                name: currentNode.name + '\'s Sibling',
                x: currentNode.x + (position === 'left' ? -1 : 1),
                y: currentNode.y,
                dateOfBirth: 'Unknown',
                placeOfBirth: 'Unknown',
                gender: 'M',
                isAlive: true,
                deathDate: null,
                photoUrl: '',
                notes: 'No notes',
                partnerId: null,
                children: []
            };

            setNodeState(prev => [
                ...prev,
                newSibling
            ]);

            setNodeState(prev =>
                prev.map(node =>
                    node.id === currentNode.id
                        ? { ...node, children: [...node.children, newId] }
                        : node
                )
            );
        // ADDING CHILD BY CLICKING THE BOTTOM BUTTON OF A NODE
        // ADDING CHILD BY CLICKING THE BOTTOM BUTTON OF A NODE
        // ADDING CHILD BY CLICKING THE BOTTOM BUTTON OF A NODE
        } else if (position === 'bottom') {
            const newChild = {
                id: newId,
                name: currentNode.name + '\'s child',
                x: currentNode.x,
                y: currentNode.y + 1,
                dateOfBirth: 'Unknown',
                placeOfBirth: 'Unknown',
                gender: 'M',
                isAlive: true,
                deathDate: null,
                photoUrl: '',
                notes: 'No notes',
                partnerId: null,
                children: []
            };

            setNodeState(prev => [
                ...prev,
                newChild
            ]);

            setNodeState(prev =>
                prev.map(node =>
                    node.id === currentNode.id
                        ? { ...node, children: [...node.children, newId] }
                        : node
                )
            );
        }
    };


    return (
        <div className="wrapper">
            <div className="container">
                {node.map(node => (
                    <div
                        key={node.id}
                        className="node-container"
                        style={{
                            gridColumn: node.x + 11,
                            gridRow: node.y + 11
                        }}
                    >
                        <div
                            className="node"
                            style={{
                                backgroundColor: !node.isAlive
                                    ? 'grey' // Set grey color if not alive
                                    : node.gender === 'M'
                                        ? '#ADD8E6' // Light blue for male
                                        : node.gender === 'F'
                                            ? '#FFB6C1' // Light pink for female
                                            : node.gender === 'U'
                                                ? 'lightgrey' // Light grey for unknown
                                                : 'white' // Default color if gender is not specified
                            }}
                            onClick={() => handleEditNode(node)} // Open modal on node click
                        >
                            <div className="node-header">
                                <h2>{node.name}<br />(ID: {node.id})</h2>
                                {node.photoUrl && <img src={node.photoUrl} alt={node.name} className="node-photo" />}
                            </div>

                            <div className="node-info">
                                <p>B: {node.dateOfBirth}</p>
                                {!node.isAlive && node.deathDate && (
                                    <p>D: {node.deathDate}</p> // Display death date if not alive
                                )}
                            </div>

                            <div className="buttons">
                                <button
                                    onClick={(e) => { e.stopPropagation(); addNode('top', node.id); }}
                                    className="plus-button top">+</button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); addNode('left', node.id); }}
                                    className="plus-button left">+</button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); addNode('bottom', node.id); }}
                                    className="plus-button bottom">+</button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); addNode('right', node.id); }}
                                    className="plus-button right">+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for editing node attributes */}
            {editingNode && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Node</h2>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editingNode.name}
                            onChange={handleChange}
                        />
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={editingNode.dateOfBirth}
                            onChange={handleChange}
                        />
                        <label>Place of Birth:</label>
                        <input
                            type="text"
                            name="placeOfBirth"
                            value={editingNode.placeOfBirth}
                            onChange={handleChange}
                        />
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={editingNode.gender}
                            onChange={handleChange}
                        >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="U">Unknown</option>
                        </select>
                        <label>Alive:</label>
                        <input
                            type="checkbox"
                            name="isAlive"
                            checked={editingNode.isAlive}
                            onChange={(e) => handleChange({ target: { name: "isAlive", value: e.target.checked } })}
                        />
                        {!editingNode.isAlive && (
                            <>
                                <label>Death Date:</label>
                                <input
                                    type="date"
                                    name="deathDate"
                                    value={editingNode.deathDate || ""}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <label>Notes:</label>
                        <textarea
                            name="notes"
                            value={editingNode.notes}
                            onChange={handleChange}
                        ></textarea>
                        <button onClick={saveNodeChanges}>Save Changes</button>
                        <button onClick={() => setEditingNode(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);