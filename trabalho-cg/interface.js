const objects_element = document.getElementById("loaded-objects");
objects_element.innerHTML = "";

var loadID = 0;
var loaded_objs = [];

function handleFileSelect(event) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        readFile(file);
    }

    document.getElementById('fileInput').value = "";
}

function readFile(file) {
    const reader = new FileReader();

    reader.onload = e => loadObj(file.name, e.target.result);

    reader.readAsText(file);
}

function addObjElement(obj) { // Create html element
    const span = document.createElement("span");
    const h2 = document.createElement("h2");
    const button = document.createElement("button");

    button.innerText = "Add";
    span.className = "element";
    h2.innerText = obj.name;

    button.onclick = e => {
        e.preventDefault();

        scenario.addObject(JSON.parse(JSON.stringify(obj)));
    }

    span.appendChild(button);
    span.appendChild(h2);

    objects_element.appendChild(span);
}

function loadObj(name, data) { // Read obj from file
    const verts = [];
    const normals = [];
    const faces = [];

    for (const line of data.split("\n")) {
        if (line.startsWith("v ")) {
            let v = line.replace("v ", "").replace("\r", "").replace(" \r", "");
            if (v.startsWith(" ")) v = v.substring(1);
            let pos = new Vector3(...v.split(" ").map(n => Number(n)))
            verts.push(new Vector3(pos.x, pos.z, -pos.y));
            continue;
        }

        if (line.startsWith("vn ")) {
            let vn = line.replace("vn ", "").replace("\r", "").replace(" \r", "");
            if (vn.startsWith(" ")) vn = vn.substring(1);
            let normal = new Vector3(...vn.split(" ").map(n => Number(n)))
            normals.push(new Vector3(normal.x, normal.z, -normal.y).normalize);
            continue;
        }

        if (line.startsWith("f ")) {
            let f = line.replace("f ", "").replace("\r", "").replace(" \r", "");
            f = f.split(" ");
            fv = f.map(v => Number(v.split("/")[0]) - 1);
            fn = f.map(v => Number(v.split("/")[2]) - 1);

            faces.push(
                {
                    verts: fv,
                    normals: fn
                }
            );
            continue;
        }
    }

    const newObj = {
        id: loadID,
        name: name.replace(".obj", ""),
        transform: new Vector3(0, 0, 0),
        scale: new Vector3(1, 1, 1),
        rotation: new Vector3(0, 0, 0),
        verts: verts,
        faces: faces,
        normals: normals,
        color: new Vector3(0, 0, 255)
    }

    loaded_objs.push(newObj);
    addObjElement(newObj);

    loadID++;
}

document.getElementById("fileInput").addEventListener("change", handleFileSelect);