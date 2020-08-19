export default async function getMenuData() {
  return [
    {
      title: 'Balance',
      key: 'balance',
      icon: 'fe fe-dollar-sign',
      url: '/balances',
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'Transaction',
      key: 'transaction',
      icon: 'fe fe-navigation',
      url: '/transaction',
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'Notification',
      key: 'notification',
      icon: 'fe fe-bell',
      url: '/notification',
    },
    {
      title: 'Invoices',
      key: 'invoices',
      icon: 'fe fe-server',
      url: '/invoices',
    },
    {
      title: 'Vouchers',
      key: 'vouchers',
      icon: 'fe fe-shopping-bag',
      url: '/vouchers',
    },
    // {
    //   title: 'Merchants',
    //   key: 'merchants',
    //   icon: 'fe fe-book-open',
    //   url: '/merchants',
    //   roles: ['admin'], // set user roles with access to this route
    // },
    // {
    //   title: 'Settings',
    //   key: 'settings',
    //   icon: 'fe fe-hard-drive',
    //   url: '/settings',
    // },
  ]
}
