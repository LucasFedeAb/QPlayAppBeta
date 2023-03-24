/* Google Api */
/* function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
}
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "918956489588-4fdk4fqap082a44rm5n7hdkhh109dng8.apps.googleusercontent.com",
        context: "signin",
        ux_mode: "popup",
        login_uri: "https://qplay-beta.vercel.app/Pages/juegos.html",
        auto_prompt: "false",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", shape: "pill", text: "continue_with", logo_alignment: "center", width: "300", type: "standard" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
} */

/* function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // Get user profile information
    const profile = response.profileObj;
    const { name, email, imageUrl } = profile;
    console.log(`User name: ${name}`);
    console.log(`User email: ${email}`);
    console.log(`User profile image URL: ${imageUrl}`);
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "918956489588-4fdk4fqap082a44rm5n7hdkhh109dng8.apps.googleusercontent.com",
        context: "signin",
        ux_mode: "popup",
        login_uri: "https://qplay-beta.vercel.app/Pages/juegos.html",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", shape: "pill", text: "continue_with", logo_alignment: "center", width: "300", type: "standard" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
} */
