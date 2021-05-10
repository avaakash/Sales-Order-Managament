const add = [
    {
        label: 'Customer Name',
        fieldName: 'customerName',
        type: 'text',
        value: '',
        required: true
    },
    {
        label: 'Customer No.',
        fieldName: 'customerNumber',
        type: 'text',
        value: '',
        required: true
    },
    {
        label: 'Order No.',
        fieldName: 'salesOrderID',
        type: 'text',
        value: '',
        required: true
    },
    {
        label: 'Order Amount',
        fieldName: 'salesOrderAmount',
        type: 'text',
        value: '',
        required: true
    },
    {
        label: 'Due Date',
        fieldName: 'dueDate',
        type: 'date',
        value: null,
        required: true
    },
    {
        label: 'Notes',
        fieldName: 'notes',
        type: 'textarea',
        value: '',
        required: false
    }
]

const edit = [
    {
        label: 'Order No.',
        fieldName: 'salesDocID',
        type: 'hidden',
        value: '',
    },
    {
        label: 'Order Amount',
        fieldName: 'salesOrderAmount',
        type: 'text',
        value: '',
        required: true
    },
    {
        label: 'Notes',
        fieldName: 'notes',
        type: 'textarea',
        value: '',
        required: false
    }
]

const remove = [
    {
        type: 'message',
        message: "<p>You'll lose your record(s) after this action. We can't recover them once you delete.</p><p>Are you sure you want to <span style='color:red'>permanently delete</span> them"
    }
]

export { add, edit, remove }