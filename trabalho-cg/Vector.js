class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    divide(value) {
        return new Vector2(this.x / value, this.y / value);
    }

    multiply(value) {
        return new Vector2(this.x * value, this.y * value);
    }

    sum(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    div(vector) {
        return new Vector2(this.x / vector.x, this.y / vector.y);
    }

    multi(vector) {
        return new Vector2(this.x * vector.x, this.y * vector.y);
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    get magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    get normalize() {
        const mag = this.magnitude;
        if (mag == 0) return new Vector2(0, 0);
        return this.divide(mag);
    }
}

class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    divide(value) {
        return new Vector3(this.x / value, this.y / value, this.z / value);
    }

    multiply(value) {
        return new Vector3(this.x * value, this.y * value, this.z * value);
    }

    sum(other) {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    subtract(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    div(other) {
        return new Vector3(this.x / other.x, this.y / other.y, this.z / other.z);
    }

    multi(other) {
        return new Vector3(this.x * other.x, this.y * other.y, this.z * other.z);
    }

    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    get magnitude() {
        return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
    }

    get normalize() {
        const mag = this.magnitude;
        if (mag == 0) return new Vector3(0, 0, 0);
        return this.divide(mag);
    }
}