const menuItems = {
  header: [
    {
      title: 'Inventory',
      default: true,
      name: 'inventory',
      iconClass: 'fa-th',

      children: [
        {
          title: 'Adslots List',
          name: 'adList',
          iconClass: 'fa-list-alt'
        }
      ]
    }
  ],
  title: { label: 'AD Slots Manager', class: 'fas fa-cogs' }
};

export default menuItems;
