const formFields = [
  {
    id: 'id',
    label: '',
    type: 'label',
    definition: 'Ad slot ID',
    placeholder: 'Enter ID',
    description: 'ID of the Ad slot'
  },
  {
    id: 'name',
    required: true,
    label: '',
    type: 'text',
    definition: 'Ad slot name',
    placeholder: 'Enter name',
    description: 'Name of the Ad slot'
  },
  {
    id: 'type',
    label: 'Ad Type',
    type: 'select',
    items: [1, 2, 3, 4],
    definition: 'Ad slot type',
    placeholder: 'Enter type',
    description: 'Type of the Ad slot'
  },
  {
    id: 'url',
    required: true,
    label: '',
    type: 'text',
    definition: 'Ad slot url',
    placeholder: 'Enter url',
    description: 'URL of the Ad slot'
  },
  {
    id: 'format',
    subId: 'width',
    required: true,
    type: 'inputGroup',
    allow: 'number',
    prependText: 'Width',
    description: 'Width of the Ad slot',
    appendText: 'px',
    delimiter: 'x',
    valueIdx: 0
  },
  {
    id: 'format',
    subId: 'height',
    required: true,
    type: 'inputGroup',
    allow: 'number',
    prependText: 'Height',
    description: 'Height of the Ad slot',
    appendText: 'px',
    delimiter: 'x',
    valueIdx: 1
  },
  {
    id: 'price',
    label: '',
    type: 'number',
    definition: 'Ad slot price',
    placeholder: 'Enter price',
    description: 'Price of the Ad slot'
  },
  {
    id: 'fallback',
    label: 'Fallback',
    type: 'slider'
  }
];

export default formFields;
