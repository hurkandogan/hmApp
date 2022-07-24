exports.getAllObjects = async con => {
    const result_parent = await con.promise().query('SELECT * FROM parent_objects ORDER BY sort_number');
    const result_sub = await con.promise().query('SELECT * FROM sub_objects ORDER BY sort_number');
    const objects = [];

    for (let i = 0; i < result_parent[0].length; i++) {
        let parent_object = result_parent[0][i];
        parent_object.sub_objects = [];
        for (let j = 0; j < result_sub[0].length; j++) {
            const sub_object = result_sub[0][j];
            if (sub_object.parent_object)
                if (parent_object.id === sub_object.parent_object) {
                    parent_object.sub_objects.push(sub_object);
                }
        }
        if (parent_object.sub_objects.length > 0)
            objects.push(parent_object);
    }

    for (let i = 0; i < result_sub[0].length; i++) {
        const sub_object = result_sub[0][i];
        if (!sub_object.parent_object)
            objects.push(sub_object);
    }

    return objects;
};