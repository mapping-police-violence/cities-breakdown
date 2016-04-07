import Graphic from './graphic';


export default class UnarmedGraphic extends Graphic {
  _transformGroup(group) {
    if (group) {
      group = group.filter((d) => d.armed === 'Unarmed')
    }
    return super._transformGroup(group);
  }
}
