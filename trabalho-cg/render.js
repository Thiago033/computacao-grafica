const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function projectionPoint(delta) { // 3D to 2D
    // Projection
    const distHorizontal = new Vector2(delta.x, delta.y).magnitude;

    const x = (delta.x / delta.y) * scenario.camera.focalLength;
    const y = (delta.z / distHorizontal) * scenario.camera.focalLength;

    return new Vector2((x + 1) * canvas.width * 0.5, (y + 1) * canvas.height * 0.5);
}

function rotate(point, angles) {
    // Rotation
    let pitch = -angles.x * 0.0174;
    let yaw = angles.y * 0.0174;
    let roll = angles.z * 0.0174;

    // X
    let cx = Math.cos(pitch);
    let sx = Math.sin(pitch);
    point = new Vector3(point.x, point.y * cx + point.z * sx, point.z * cx - point.y * sx);

    // Y
    let cy = Math.cos(yaw);
    let sy = Math.sin(yaw);
    point = new Vector3(point.x * cy + point.z * sy, point.y, point.z * cy - point.x * sy);

    // Z
    let cz = Math.cos(roll);
    let sz = Math.sin(roll);
    point = new Vector3(point.x * cz - point.y * sz, point.x * sz + point.y * cz, point.z);

    return point
}

function movePoint3D(point, objPos, objScale, objRotation) {
    // Scale
    point = point.multi(objScale);

    // Rotation
    point = rotate(point, objRotation);

    // Transform
    point = point.subtract(objPos);

    return point.subtract(scenario.camera.pos);
}

function render() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let polygons = []; // polygon = ([triangle], distance, color)

    scenario.objs.forEach(obj3D => {
        obj3D.faces.forEach(face => {

            let triangle = [];
            let sumPoints = new Vector3(0, 0, 0);
            let intensity = 0;

            face.verts.forEach(index => {
                let delta = movePoint3D(obj3D.verts[index], obj3D.transform, obj3D.scale, obj3D.rotation);
                sumPoints = sumPoints.sum(delta);

                let normal = obj3D.normals[face.normals[0]];
                normal = new Vector3(normal.x, normal.y, normal.z);
                intensity += normal.dot(rotate(scenario.sun, obj3D.rotation.multiply(-1)).subtract(delta).normalize);

                triangle.push(projectionPoint(delta));
            });

            intensity = Math.min(1, Math.max(0, scenario.ambientLight + intensity/triangle.length));
            
            polygons.push(
                {
                    triangle: triangle,
                    distance: sumPoints.divide(triangle.length).magnitude,
                    color: new Vector3(obj3D.color.x, obj3D.color.y, obj3D.color.z).multiply(intensity)
                }
            );
        });
    });

    polygons = polygons.sort((a, b) => b.distance - a.distance);

    polygons.forEach(poly => {
        ctx.fillStyle = `rgb(${poly.color.x}, ${poly.color.y}, ${poly.color.z})`;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        for (let i = 0; i < poly.triangle.length; i++) {
            const p = poly.triangle[i];

            if (i == 0) {
                ctx.moveTo(p.x, p.y);
                continue;
            }
            ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        //ctx.stroke();
        ctx.fill();
    });
}

const dt = 1/60;

// MAIN LOOP
setInterval(() => {
    scenario.time += dt;

    scenario.objs.forEach(obj => {
        //obj.rotation.z = (obj.rotation.z + 45 * dt) % 360;
    });
    
    render();
}, dt*1000);