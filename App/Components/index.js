import LinearGradientComponent from 'react-native-linear-gradient'
import ValidationComponentComponent from 'react-native-form-validator'
import validatorComponent from 'validator'
import renderIfComponent from 'render-if'
import TriangleComponent from 'react-native-triangle'
import SlidingUpPanelComponent from 'rn-sliding-up-panel'

import AlertBoxComponent from './AlertBox'
import BannerLogoComponent from './BannerLogo'
import CenterViewComponent from './CenterView'
import CircleLoaderComponent from './CircleLoader'
import CircleButtonComponent from './CircleButton'
import ButtonComponent from './Button'
import RowViewComponent from './RowView'
import SpacerComponent from './Spacer'
import ToPublicButtonComponent from './ToPublicButton'
 
export class AlertBox extends AlertBoxComponent {}

export class BannerLogo extends BannerLogoComponent {}

export class Button extends ButtonComponent {}

export class CenterView extends CenterViewComponent {}

export class CircleButton extends CircleButtonComponent {}

export class CircleLoader extends CircleLoaderComponent {}

export class LinearGradient extends LinearGradientComponent {}

export class RowView extends RowViewComponent {}

export class Spacer extends SpacerComponent {}

export class ToPublicButton extends ToPublicButtonComponent {}

export const validator = validatorComponent

export const renderIf = renderIfComponent

export class ValidationComponent extends ValidationComponentComponent {}

export class Triangle extends TriangleComponent {}

export class SlidingUpPanel extends SlidingUpPanelComponent {}


