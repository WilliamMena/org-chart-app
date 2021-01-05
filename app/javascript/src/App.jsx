import React, { useEffect, useState } from "react";
import NodeForm from './components/nodeForm.jsx'

const hasChildren = ({ node, nodes }) =>
  nodes.some((item) => item.parent_id === node.id);
const getChildren = ({ node, nodes }) =>
  nodes.filter((item) => item.parent_id === node.id);

const handleButton = (e) => {
  // console.log(`form${e.target.value}`)
  // console.log(e);

  var x = document.getElementById(`form${e.target.value}`)
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
  
const Level = ({ nodes, parent }) => {
  let name = parent.last_name ? (
    <div className="name">
      {parent.first_name} {parent.last_name} - ID: {parent.id} - P ID: {parent.parent_id}
    </div>
  ) : null;

  if (!parent.root) {
    name = React.createElement(
      "div",
      {className: 'name'},
      name,
      <button value={parent.id} onClick={handleButton}>Edit</button>,
      <NodeForm nodes={nodes} current={parent}/>,
      <br/>
    )
  }

  if (!hasChildren({ nodes, node: parent })) {
    return name;
  }

  return (
    <>  
      {name}
      <ul>
        {getChildren({ node: parent, nodes }).map((child) => (
          <li key={child.id}>
            <Level nodes={nodes} parent={child} />
          </li>
        ))}
      </ul>
    </>
  );
};

const App = () => {
  const [nodes, setNodes] = useState(null);
  useEffect(() => {
    fetch("/nodes", {
      method: "GET",
      headers: new window.Headers({
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setNodes(data);
      });
  }, []);

  return (
    <>
      <h1>Org Chart</h1>
      {nodes ? (
          <Level nodes={nodes} parent={nodes.find((node) => node.root)} />
      ) : (
        "loading..."
      )}
    </>
  );
};

export default App;
