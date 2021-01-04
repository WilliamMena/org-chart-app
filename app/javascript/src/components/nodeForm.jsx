import React from 'react';

const NodeForm = ({nodes, current}) => {

    return (
        <form hidden id={`form${current.id}`}>
            <label>

            Who is this users new boss?
            <select>
                { nodes.map((x) => <option key={x.id} value={x.id}>{`${x.first_name} ${x.last_name} ID: ${x.id}`}</option>
                )}
            </select>
            <br/>
            This user now runs this whole Org
            <input type="checkbox"/>
            </label>

            <br/>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default NodeForm