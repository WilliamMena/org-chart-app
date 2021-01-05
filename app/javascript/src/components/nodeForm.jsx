import React, { useEffect, useState } from 'react';

const NodeForm = ({nodes, current}) => {

    const [parentID, setParentID] = useState(1);
    const [bringTeam, setBringTeam] = useState(false);
    const [makeRootUser, setMakeRootUser] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(makeRootUser);

        const data = { 
            "node": {
                "parent_id": parentID,
                "bring_team": bringTeam,
                "make_root_user": makeRootUser
            }
         };

        fetch(`http://localhost:3000/nodes/${current.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    const filteredNodes = nodes.filter((n) => n.id != current.parent_id)
                // filter out current user
                .filter((n) => n.id != current.id)

    const handleMakeRootUser = (e) => {
        
        if (!makeRootUser) {
            alert("If this is selected upon submission, all other attributes will be ignored.")
            setMakeRootUser(true);
        } else {
            setMakeRootUser(false);
        }
        // console.log(makeRootUser);
        // debugger
    }

    // Make default value parentID the first value in the node list.
    useEffect(() => {
        setParentID(filteredNodes[0].id);
    })

    return (
        <form id={`form${current.id}`} onSubmit={handleSubmit}>
            <label>

            Who is this users new boss?
            <select onChange={e => setParentID(e.target.value)}>
                {/* Filter out current boss */}
                { filteredNodes.map((x) => <option key={x.id} value={x.id}>{`${x.first_name} ${x.last_name} ID: ${x.id}`}</option>

                )}
            </select>
            <br/>
            Bring team with you?
            <input type="checkbox" onChange={e => setBringTeam(e.target.checked)}/>

            <br/>
            <br/>
            This user now runs this whole Org
            <input type="checkbox" onChange={handleMakeRootUser}/>
            </label>

            <br/>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default NodeForm