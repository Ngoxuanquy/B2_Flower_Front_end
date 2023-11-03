import React, { useState } from 'react';
import { Checkbox, Divider } from 'antd';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

function CheckGroup() {
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate =
        checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list) => {
        setCheckedList(list);
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };

    return (
        <>
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
            >
                Check all
            </Checkbox>
            <Divider />
            <Checkbox
                options={plainOptions}
                value={checkedList}
                onChange={onChange}
            />
        </>
    );
}

export default CheckGroup;
