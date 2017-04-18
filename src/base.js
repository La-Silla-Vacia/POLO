import { h, render, Component } from 'preact';
import * as d3 from "d3";

import Group from './Components/Group/Group';
import Timeline from './Components/Timeline/Timeline';

import s from './base.css';

// const claraLopez = require('./images/claraLopez.jpg');


export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      groups: [],
      year: 2005
    };

    this.changeYear = this.changeYear.bind(this);
  }

  changeYear(year) {
    this.setState({ year });
    this.props.callback(year);
  }

  getText() {
    const year = this.state.year;
    if (year === 2005) {
      return '2005 fue cuando se creó el Polo Democrático Alternativo, el momento de mayor unión de la izquierda. Allí llegaron, entre otros, el Partido Comunista, el Frente Social y Político con el ex magistrado Carlos Gaviria a la cabeza, el Polo Democrático Independiente (PDI) que lideraba Lucho Garzón y que tenía, entre otros, al Moir de Jorge Enrique Robledo, al grupo de ex M-19 incluidos Gustavo Petro y Antonio Navarro, y la Anapo de la familia Moreno.';
    } else if (year === 2009) {
      return 'En 2009, Luis Eduardo Garzón renunció al Polo porque antes de que empezara la carrera presidencial de 2010, el partido se dividió entre si apoyar a Garzón o a Carlos Gaviria a la Presidencia. \'Lucho\' renunció para  armar una candidatura independiente a la Presidencia con el grupo de los Quíntuples, que conformaban Sergio Fajardo, Marta Lucía Ramírez, Antanas Mockus y Enrique Peñalosa. Al final, quedaron de precandidatos del Partido Verde Garzón, Mockus y Peñalosa.';
    } else if (year === 2011) {
      return 'En diciembre de 2010 Gustavo Petro se fue del Polo para crear su movimiento \'Progresistas\' y lanzarse como candidato a la alcaldía de Bogotá. Lo hizo a raíz del carrusel de la contratación del entonces alcalde, Samuel Moreno, elegido con la fuerza electoral del Polo y ante la pasividad del partido frente al escándalo. Con su destitución más la inhabilidad que le puso la Procuraduría por veinte años, la Anapo quedó sepultada como fuerza electoral.'
    } else {
      return 'Con la salida de Clara López, es posible que una parte del Polo Social se vaya con ella pero es menos probable que senadores como Iván Cepeda o Sénen Niño, que son de su cuerda, también lo hagan.  Si lo hacen, el Polo quedaría conformado por Nueva Tendencia de senadores como Alberto Castilla, líder del Congreso de los Pueblos y por el Moir, liderado por Robledo. El Moir quedaría con gran poder en el partido, pues su secretario general, Gustavo Triana, es de esa tendencia y hace dos meses Robledo quedó como candidato único del partido para las elecciones de 2018. '
    }
  }


  render(props, state) {

    const text = this.getText();
    return (
      <div className={s.container}>
        <svg style={{ opacity: 0, pointerEvents: 'none', position: 'absolute' }} id="mySvg" width="110" height="110">
          <defs>
            <pattern id="img_claraLóPez" x="0" y="0" height="100%" width="100%" patternContentUnits="objectBoundingBox"
                     viewBox="0 0 1 1">
              <image x="0" y="0" width="1" height="1"
                     xlinkHref="https://github.com/La-Silla-Vacia/POLO/raw/master/src/images/claraLopez.jpg" />
            </pattern>
            <pattern id="img_moir" x="0" y="0" height="100%" width="100%" patternContentUnits="objectBoundingBox"
                     viewBox="0 0 1 1">
              <image x="0" y="0" width="1" height="1"
                     xlinkHref="https://github.com/La-Silla-Vacia/POLO/raw/master/src/images/jorgeEnriqueRobledo.jpg" />
            </pattern>
            <pattern id="img_poloSocial" x="0" y="0" height="100%" width="100%" patternContentUnits="objectBoundingBox"
                     viewBox="0 0 1 1">
              <image x="0" y="0" width="1" height="1"
                     xlinkHref="https://github.com/La-Silla-Vacia/POLO/raw/master/src/images/ivanCepeda.jpg" />
            </pattern>
            <pattern id="img_anapo" x="0" y="0" height="100%" width="100%" patternContentUnits="objectBoundingBox"
                     viewBox="0 0 1 1">
              <image x="0" y="0" width="1" height="1"
                     xlinkHref="https://github.com/La-Silla-Vacia/POLO/raw/master/src/images/samuelMoreno.jpg" />
            </pattern>
            <pattern id="img_petrismo" x="0" y="0" height="100%" width="100%" patternContentUnits="objectBoundingBox"
                     viewBox="0 0 1 1">
              <image x="0" y="0" width="1" height="1"
                     xlinkHref="https://github.com/La-Silla-Vacia/POLO/raw/master/src/images/gustavoPetro.jpg" />
            </pattern>
            <pattern id="img_lucho" x="0" y="0" height="100%" width="100%" patternContentUnits="objectBoundingBox"
                     viewBox="0 0 1 1">
              <image x="0" y="0" width="1" height="1"
                     xlinkHref="https://github.com/La-Silla-Vacia/POLO/raw/master/src/images/LuisEduardoGarzon.jpg" />
            </pattern>
          </defs>
        </svg>
        <div className={s.flex}>
          <div className={s.legend}>
            <ul>
              <li><span className={s.yellow} /> En el Polo</li>
              <li><span className={s.black} /> Fuera del Polo</li>
            </ul>
          </div>
          <div id="lsvi-base" className={s.img_container} data-balloon="Whats up!" data-balloon-pos="left" >
          </div>
          <div className={s.description}>
            <h2>{state.year}</h2>
            <p>{text}</p>
          </div>
        </div>
        <Timeline callback={this.changeYear} current={state.year} />
      </div>
    )
  }
}