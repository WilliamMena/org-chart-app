import React, { useEffect, useState } from 'react';

const NodeForm = ({nodes, current}) => {
    // parentID created below to avoid too many renders.
    // const [parentID, setParentID]
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

        //  console.log(data);

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
        alert('Success. Refreshing chart.');
        })
        .catch((error) => {
        console.error('Error:', error);
        alert('Error:', error);
        });

        // debugger;
        location.reload();
    }

    const filteredNodes = nodes.filter((n) => n.id != current.parent_id)
                // filter out current user
                .filter((n) => n.id != current.id)
                .sort(function(a, b) {
                    var nameA = a.first_name.toUpperCase();
                    var nameB = b.first_name.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                
                    return 0;
                  });

    // Created here to utilize filteredNodes and avoid extra rendering
    const [parentID, setParentID] = useState(filteredNodes[0].id);

    const handleMakeRootUser = (e) => {
        
        if (!makeRootUser) {
            alert("If this is selected upon submission, all other attributes will be ignored.")
            setMakeRootUser(true);
        } else {
            setMakeRootUser(false);
        }
    }

    const myStyle = {
        display: "none"
    }

    return (
        <form className="nodeForm" id={`form${current.id}`} style={myStyle} onSubmit={handleSubmit}>
            <label>

            Who is this users new boss?
            <select onChange={e => setParentID(e.target.value)}>
                {/* Filter out current boss */}
                { filteredNodes.map((x) => <option key={x.id} value={x.id}>{`${x.first_name} ${x.last_name} ID: ${x.id}`}</option>

                )}
            </select>
            <br/>
            Bring your team with you?
            <input type="checkbox" onChange={e => setBringTeam(e.target.checked)}/>

            <br/>
            <br/>
            This user now runs this whole Organization
            <input type="checkbox" onChange={handleMakeRootUser}/>
            </label>

            <br/>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default NodeForm