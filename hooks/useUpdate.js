const useUpdate = (status, email) => {
    const data = { status };

    fetch(`https://mighty-thicket-60343.herokuapp.com/food/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((result) => {
            if (result.modifiedCount) {
                alert("Your foods are processing!");
            }
        });
};

export default useUpdate;
