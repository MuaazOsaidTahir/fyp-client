export const longLivedToken = async (token: any) => {
    const longlivedAccessToken = await fetch(`http://localhost:8000/fb-long-lived`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
    });
    const res = await longlivedAccessToken.json();
    console.log(res);
}