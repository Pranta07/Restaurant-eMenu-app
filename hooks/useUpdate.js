const useUpdate = (status, email) => {
    fetch(`https://mighty-thicket-60343.herokuapp.com/food/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(status),
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        });
};
export default useUpdate;
