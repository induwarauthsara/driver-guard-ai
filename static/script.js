const video = document.getElementById('video');
const alertBox = document.getElementById('alert');

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    setInterval(sendFrame, 300); // Send frame every 300ms
});

function sendFrame() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg');

    fetch('/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    })
    .then(res => res.json())
    .then(data => {
        if (data.sleepy) {
            alertBox.style.display = 'block';
        } else {
            alertBox.style.display = 'none';
        }
        console.log("EAR:", data.ear.toFixed(3));
    })
    .catch(err => console.error("Detection error:", err));
}
