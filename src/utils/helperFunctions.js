// Converts from degrees to radians.
function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
function toDegrees(radians) {
    return (radians * 180) / Math.PI;
}

// Computes distance between two geo coordinates in kilometers.
export function computeDistance(lat1, lon1, lat2, lon2) {
    let R = 6371; // km (change this constant to get miles)
    let dLat = ((lat2 - lat1) * Math.PI) / 180;
    let dLon = ((lon2 - lon1) * Math.PI) / 180;
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return `${round(d, 3)} km`;
}

// Computes bearing between two geo coordinates in degrees.
export function computeBearing(startLat, startLng, destLat, destLng) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    let y = Math.sin(destLng - startLng) * Math.cos(destLat);
    let x =
        Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    const bearing = (brng + 360) % 360
    return bearing.toFixed(3);
}

function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

