import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class FamilyTreeBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', birthday: '', age: '', newTreeValidated: false, savedTreeValidated: false, nameValidated: false, birthdayValidated: false, ageValidated: false };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    handleNewTree = () => {
        var newTreeButton = document.getElementById('newTreeBtn');
        var savedTreeButton = document.getElementById('savedTreeBtn');
        this.setState({ newTreeValidated: true });
        newTreeButton.style.display = "none";
        savedTreeButton.style.display = "none";
    }

    handleSavedTree = () => {
        var newTreeButton = document.getElementById('newTreeBtn');
        var savedTreeButton = document.getElementById('savedTreeBtn');
        this.setState({ savedTreeValidated: true });
        newTreeButton.style.display = "none";
        savedTreeButton.style.display = "none";
    }

    handleValidateName = () => {
        var nameValidationBlock = document.getElementById('myName');
        const { name } = this.state;
        if (name.trim() !== '') {
            this.setState({ nameValidated: true });
            nameValidationBlock.style.display = "none";
        } else {
            alert("Please enter a valid name.");
        }
    }

    handleValidateBirthday = () => {
        var birthdayValidationBlock = document.getElementById('myBirthday');
        const { birthday } = this.state;
        if (birthday.trim() !== '') {
            this.setState({ birthdayValidated: true });
            birthdayValidationBlock.style.display = "none";
        } else {
            alert("Please enter a valid birthday.");
        }
    }

    handleValidateAge = () => {
        var ageValidationBlock = document.getElementById('myAge');
        const { age } = this.state;
        if (age.trim() !== '') {
            this.setState({ ageValidated: true });
            ageValidationBlock.style.display = "none";
        } else {
            alert("Please enter a valid age.");
        }
    }

    render() {
        // TODO: Add saving and loading capabilities.
        const { newTreeValidated, savedTreeValidated, name, birthday, age, nameValidated, birthdayValidated, ageValidated } = this.state;

        return (
            <div>

                <button id='newTreeBtn' onClick={this.handleNewTree}>New Family Tree</button>
                <button id='savedTreeBtn' onClick={this.handleSavedTree}>Saved Family Tree</button>

                {newTreeValidated && (
                    <>
                        <div id='myName'>
                            <h2>Let's start with you.</h2>
                            <h2>What is your name?</h2>
                            <label>Name: </label>
                            <input type="text" name="name" value={name} onChange={this.handleChange} />
                            <br />
                            <br />
                        </div>

                        {!nameValidated && (
                            <button onClick={this.handleValidateName}>Validate Name</button>
                        )}
                        {nameValidated && (
                            <>

                                <div id='myBirthday'>
                                    <h2>When is your birthday?</h2>
                                    <label>Birthday: </label>
                                    <input type="text" name="birthday" value={birthday} onChange={this.handleChange} />
                                    <br />
                                    <br />
                                </div>

                                {!birthdayValidated && (
                                    <button onClick={this.handleValidateBirthday}>Validate Birthday</button>
                                )}
                                {birthdayValidated && (
                                    <>

                                        <div id='myAge'>
                                            <h2>How old are you?</h2>
                                            <label>Age: </label>
                                            <input type="text" name="age" value={age} onChange={this.handleChange} />
                                            <br />
                                            <br />
                                        </div>

                                        {!ageValidated && (
                                            <button onClick={this.handleValidateAge}>Validate Age</button>
                                        )}
                                        {ageValidated && (
                                            <>
                                                <Node name={name} birthday={birthday} age={age} />
                                            </>
                                        )}

                                    </>

                                )}

                            </>

                        )}
                    </>
                )}
            </div>
        );
    }
}

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            parentCount: 0,
            childCount: 0,
            siblingCount: 0,
            spouseCount: 0
        };
    }

    handleFocus = () => {
        this.setState({ isFocused: true });
    }

    handleBlur = () => {
        setTimeout(() => {
            this.setState({ isFocused: false });
        }, 250);
    }

    addParentClick = () => {
        this.setState(prevState => ({
            parentCount: prevState.parentCount + 1 // increment parent count
        }));
    }

    addChildClick = () => {
        this.setState(prevState => ({
            childCount: prevState.childCount + 1 // increment child count
        }));
    }

    addSpouseClick = () => {
        this.setState(prevState => ({
            spouseCount: prevState.spouseCount + 1 // increment spouse count
        }));
    }

    addSiblingClick = () => {
        this.setState(prevState => ({
            siblingCount: prevState.siblingCount + 1 // increment sibling count
        }));
    }

    render() {
        const { name, birthday, age } = this.props;
        const { isFocused, parentCount, childCount, spouseCount, siblingCount } = this.state;

        // Calculate the position of the parent nodes
        const parentNodes = [];
        for (let i = 0; i < parentCount; i++) {
            parentNodes.push(
                <div class='node' key={`parent-${i}`} style={{ position: 'absolute', top: `${-32 - 128 * (i + 1)}px`, left: '50%', transform: 'translateX(-50%)' }}>
                    {/* Render additional parent nodes here */}
                    Parent {i + 1}
                </div>
            );
        }

        // Calculate the position of the parent nodes
        const childNodes = [];
        for (let i = 0; i < childCount; i++) {
            childNodes.push(
                <div class='node' key={`child-${i}`} style={{ position: 'absolute', bottom: `${-32 - 128 * (i + 1)}px`, left: '50%', transform: 'translateX(-50%)' }}>
                    {/* Render additional child nodes here */}
                    Child {i + 1}
                </div>
            );
        }

        // Calculate the position of the spouse nodes
        const spouseNodes = [];
        for (let i = 0; i < spouseCount; i++) {
            spouseNodes.push(
                <div class='node' key={`spouse-${i}`} style={{ position: 'absolute', left: `${-32 - 128 * (i + 1)}px`, top: '50%', transform: 'translateY(-50%)' }}>
                    {/* Render additional spouse nodes here */}
                    Spouse {i + 1}
                </div>
            );
        }

        // Calculate the position of the spouse nodes
        const siblingNodes = [];
        for (let i = 0; i < siblingCount; i++) {
            siblingNodes.push(
                <div class='node' key={`sibling-${i}`} style={{ position: 'absolute', right: `${-32 - 128 * (i + 1)}px`, top: '50%', transform: 'translateY(-50%)' }}>
                    {/* Render additional sibling nodes here */}
                    Sibling {i + 1}
                </div>
            );
        }

        return (
            <div className="node" onFocus={this.handleFocus} onBlur={this.handleBlur} tabIndex="0">
                {isFocused && (
                    <>
                        <button className="addParent" onClick={this.addParentClick} style={{ position: 'absolute', top: '-32px', left: '50%', transform: 'translateX(-50%)' }}>+</button>
                        <button className="addChild" onClick={this.addChildClick} style={{ position: 'absolute', bottom: '-32px', left: '50%', transform: 'translateX(-50%)' }}>+</button>
                        <button className="addSpouse" onClick={this.addSpouseClick} style={{ position: 'absolute', left: '-32px', top: '50%', transform: 'translateY(-50%)' }}>+</button>
                        <button className="addSibling" onClick={this.addSiblingClick} style={{ position: 'absolute', right: '-32px', top: '50%', transform: 'translateY(-50%)' }}>+</button>
                    </>
                )}
                {/* Render additional parent nodes */}
                {parentNodes}
                {childNodes}
                {spouseNodes}
                {siblingNodes}
                <p id='nodeText'>{name}</p>
                <p id='nodeText'>{birthday} ({age})</p>
            </div>
            
        );
    }
}


ReactDOM.render(
    <React.StrictMode>
        <FamilyTreeBuilder />
    </React.StrictMode>,
    document.getElementById('root')
);
