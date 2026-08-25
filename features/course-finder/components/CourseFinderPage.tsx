// The chrome-less build of the finder: it renders no header or footer of its
// own, so it sits directly under our navbar without a second set of navigation.
//
// ?theme takes a hex colour and repaints the tool's accent (the Apply Filter
// button, the active page number, the Advanced Filter link and the Apply Now
// buttons), which otherwise ships a magenta that is close to our brand purple
// without matching it. It is read once into state when the app mounts, so it
// survives the app rewriting the query string as students filter. The value is
// --color-brand-purple from globals.css, minus the leading hash, since a hash
// in a URL would start a fragment.
const BRAND_PURPLE = '590D82'
const EMBED_URL = `https://coursefinder.saturdayeducation.com/embeddable-programs?theme=${BRAND_PURPLE}`

interface Props {
  translations: {
    frameTitle: string
  }
}

export function CourseFinderPage({ translations: t }: Props) {
  return (
    <main>
      {/* The page is the tool, so the only heading is one for screen readers and
          search engines. Nothing is rendered above the frame. */}
      <h1 className="sr-only">{t.frameTitle}</h1>

      {/* Aligned with the navbar's container from xl up, and edge to edge below
          it. That is deliberate rather than untidy. Media queries inside a frame
          measure the frame, not the window, and the tool's filter panel is set
          to display {base:'none', lg:'block'} where Mantine's lg is 1200px. Any
          horizontal padding therefore comes straight off the width the tool has
          to work with, and pushing it under 1200px hides the filters outright.
          Padding only starts at xl (1280px), where 64px still leaves 1216px.

          Below 1200px the tool has no reachable filters at all. It does build a
          filter Drawer for narrow screens, but the Burger that opens it lives in
          the Mantine AppShell.Header, and this embeddable build is the one that
          switches the header off. That one is Firmli's to fix. */}
      <div className="max-w-7xl mx-auto px-0 xl:px-8 py-6">

        {/* Card view sits at two programs per row: the grid is a SimpleGrid set
            to cols={base:1, sm:2, lg:2, xl:3} and Mantine's xl is 1408px, which
            this container does not reach. The tool's list view suits this width
            better anyway, via the toggle above the results. */}
        <div className="overflow-hidden border-y border-gray-200 xl:rounded-2xl xl:border-x h-[calc(100dvh-7.5rem)] min-h-[640px]">
          <iframe
            src={EMBED_URL}
            title={t.frameTitle}
            className="block w-full h-full border-0"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  )
}
