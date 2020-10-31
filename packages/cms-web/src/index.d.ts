declare interface Block {
  id: number
  name: string
}

declare namespace UI {

  interface PageConfig {
    id: string
    sections: Section[]
  }

  interface SectionBase {
    id: string
  }

  interface FullWidthSection extends SectionBase {
    type: 'full-width'
    module: FullWidthModule
  }

  interface RegularSection extends SectionBase {
    type: 'regular'
    columns: Column[]
  }

  type Section = FullWidthSection | RegularSection

  type ColumnWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

  interface Column {
    width: ColumnWidth
    rows: Row[]
  }

  interface Row {
    modules: Module[]
  }

  type FullWidthModuleType = 'full-width-header'

  interface Module {
    id: string
    type: FullWidthModule
    style?: CSSStyleDeclaration
  }

  interface FullWidthModule extends Module {}

  interface FullWidthHeaderModule extends FullWidthModule {
    type: 'full-width-header'
    title?: string
    subTitle?: string
    button1?: Button
    button2?: Button
    body?: string
  }

  interface Button {
    text: string
    link?: string
  }
}
