export default {
  items: [
    {
      name: 'Главная страница',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Справочники',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Национальность',
      url: '/spNation',
      icon: 'icon-layers',
    },
    {
      name: 'Образования',
      url: '/spEducation',
      icon: 'icon-layers',
    },

  ],
};
