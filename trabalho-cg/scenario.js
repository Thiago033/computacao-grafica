/*
obj: {
    id: Number
    name: String,
    verts: [3DPoints],
    faces: [(3 indexs)]
}
*/

var envID = 0;

const scenario = {
    objs: [],
    camera: {
        pos: new Vector3(0, -5, 0),
        focalLength: 1
    },
    sun: new Vector3(100, 0, 0),
    ambientLight: 0.2,
    time: 0,

    onObjectAdd: [], // Events
    onObjectRemove: [],
    onObjectUpdate: [],

    addObject: obj => {
        obj.id = envID;

        // Convert obj to Vector
        obj.transform = new Vector3(obj.transform.x, obj.transform.y, obj.transform.z);
        obj.scale = new Vector3(obj.scale.x, obj.scale.y, obj.scale.z);
        obj.rotation = new Vector3(obj.rotation.x, obj.rotation.y, obj.rotation.z);
        obj.color = new Vector3(obj.color.x, obj.color.y, obj.color.z);

        for (let i = 0; i < obj.verts.length; i++) {
            const vert = obj.verts[i];
            obj.verts[i] = new Vector3(vert.x, vert.y, vert.z);
        }

        for (let i = 0; i < obj.normals.length; i++) {
            const normal = obj.normals[i];
            obj.normals[i] = new Vector3(normal.x, normal.y, normal.z);
        }

        scenario.objs.push(obj);

        executeEvents(scenario.onObjectAdd, obj);

        envID++;
    },

    removeObject: obj => {
        scenario.objs = scenario.objs.filter(o => o !== obj);

        executeEvents(scenario.onObjectRemove);
    },

    updateObject: () => {
        executeEvents(scenario.onObjectUpdate);
    }
}

function executeEvents(eventList, param=null) {
    eventList.forEach(f => f(param));
}
