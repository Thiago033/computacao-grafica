// Controla o transform e o menu de objetos
const objsListElement = document.getElementById("scenario-objects");

function rgbToHex(color) {
    r = Math.min(255, Math.max(0, color.x));
    g = Math.min(255, Math.max(0, color.y));
    b = Math.min(255, Math.max(0, color.z));

    var hexR = r.toString(16).padStart(2, '0');
    var hexG = g.toString(16).padStart(2, '0');
    var hexB = b.toString(16).padStart(2, '0');

    return '#' + hexR + hexG + hexB;
}

function hexToRGB(hex) {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return new Vector3(r, g, b);
}

var selectedObj = null;

function updateObjsList() {
    objsListElement.innerHTML = "";

    scenario.objs.forEach(obj => {
        const div = document.createElement("div");
        const span = document.createElement("span");
        const buttonSelect = document.createElement("button");
        const buttonRemove = document.createElement("button");

        span.innerText = `${obj.id}:${obj.name} `;
        buttonSelect.innerText = "Select";
        buttonRemove.innerText = "Remove";

        buttonSelect.onclick = e => {
            e.preventDefault();
            selectedObj = obj;
            updateObjInfo();
        }

        buttonRemove.onclick = e => {
            e.preventDefault();
            scenario.removeObject(obj);
            if (selectedObj == obj) {
                selectedObj = null;
                updateObjInfo();
            };
        }

        div.appendChild(span);
        div.appendChild(buttonSelect);
        div.appendChild(buttonRemove);

        objsListElement.appendChild(div);
    });
}

const inspectObj = document.getElementById("inspect-obj");
const colorObj = document.getElementById("color");

const transformX = document.getElementById("transform-x");
const transformY = document.getElementById("transform-y");
const transformZ = document.getElementById("transform-z");

const scaleX = document.getElementById("scale-x");
const scaleY = document.getElementById("scale-y");
const scaleZ = document.getElementById("scale-z");

const rotX = document.getElementById("rot-pitch");
const rotY = document.getElementById("rot-yaw");
const rotZ = document.getElementById("rot-roll");

transformX.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.transform.x = Number(transformX.value);
    scenario.updateObject();
};

transformY.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.transform.y = Number(transformY.value);
    scenario.updateObject();
};

transformZ.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.transform.z = Number(transformZ.value);
    scenario.updateObject();
};

scaleX.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.scale.x = Number(scaleX.value);
    scenario.updateObject();
};

scaleY.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.scale.y = Number(scaleY.value);
    scenario.updateObject();
};

scaleZ.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.scale.z = Number(scaleZ.value);
    scenario.updateObject();
};

rotX.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.rotation.x = Number(rotX.value);
    scenario.updateObject();
};

rotY.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.rotation.y = Number(rotY.value);
    scenario.updateObject();
};

rotZ.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.rotation.z = Number(rotZ.value);
    scenario.updateObject();
};

colorObj.onchange = e => { // Set value
    e.preventDefault();
    selectedObj.color = hexToRGB(colorObj.value);
    scenario.updateObject();
};

function updateObjInfo() { // HTML
    if (selectedObj === null) {
        inspectObj.innerText = "---";

        color.value = "#000000";

        transformX.value = 0;
        transformY.value = 0;
        transformZ.value = 0;

        scaleX.value = 1;
        scaleY.value = 1;
        scaleZ.value = 1;

        rotX.value = 0;
        rotY.value = 0;
        rotZ.value = 0;
        return;
    }

    inspectObj.innerText = `${selectedObj.id}:${selectedObj.name}`

    color.value = rgbToHex(selectedObj.color);

    transformX.value = selectedObj.transform.x;
    transformY.value = selectedObj.transform.y;
    transformZ.value = selectedObj.transform.z;

    scaleX.value = selectedObj.scale.x;
    scaleY.value = selectedObj.scale.y;
    scaleZ.value = selectedObj.scale.z;

    rotX.value = selectedObj.rotation.x;
    rotY.value = selectedObj.rotation.y;
    rotZ.value = selectedObj.rotation.z;
}

scenario.onObjectRemove.push(updateObjsList);
scenario.onObjectAdd.push(obj => {
    console.log("Object created:", obj);
    
    selectedObj = obj;
    updateObjsList();
    updateObjInfo();
});