import { observer } from 'mobx-react-lite'

const animationTime = 1

const SvgAnimation = observer(() => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 20 20">
        <path d="M2 2L10 2" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 2L10 2;
                M2 2L9 9;
                M2 2L10 2"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M2 8L18 8" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 8L18 8;
                M2 16L16 2;
                M2 8L18 8"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M10 14L18 14" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M10 14L18 14;
                M9 9L16 16;
                M10 14L18 14"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
      </svg>{' '}
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 20 20">
        <path d="M2 2L10 2" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 2L10 2;
                M2 2L9 9;
                M2 2L10 2"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M2 8L18 8" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 8L18 8;
                M2 16L16 2;
                M2 8L18 8"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M10 14L18 14" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M10 14L18 14;
                M9 9L16 16;
                M10 14L18 14"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
      </svg>{' '}
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 20 20">
        <path d="M2 2L10 2" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 2L10 2;
                M2 2L9 9;
                M2 2L10 2"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M2 8L18 8" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 8L18 8;
                M2 16L16 2;
                M2 8L18 8"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M10 14L18 14" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M10 14L18 14;
                M9 9L16 16;
                M10 14L18 14"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
      </svg>{' '}
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 20 20">
        <path d="M2 2L10 2" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 2L10 2;
                M2 2L9 9;
                M2 2L10 2"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M2 8L18 8" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 8L18 8;
                M2 16L16 2;
                M2 8L18 8"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M10 14L18 14" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M10 14L18 14;
                M9 9L16 16;
                M10 14L18 14"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
      </svg>{' '}
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 20 20">
        <path d="M2 2L10 2" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 2L10 2;
                M2 2L9 9;
                M2 2L10 2"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M2 8L18 8" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 8L18 8;
                M2 16L16 2;
                M2 8L18 8"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M10 14L18 14" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M10 14L18 14;
                M9 9L16 16;
                M10 14L18 14"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
      </svg>{' '}
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 20 20">
        <path d="M2 2L10 2" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 2L10 2;
                M2 2L9 9;
                M2 2L10 2"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M2 8L18 8" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M2 8L18 8;
                M2 16L16 2;
                M2 8L18 8"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
        <path d="M10 14L18 14" stroke="red" strokeWidth="2.4" strokeLinecap="round">
          <animate
            attributeName="d"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="
                M10 14L18 14;
                M9 9L16 16;
                M10 14L18 14"
          />
          <animate
            attributeName="stroke"
            dur={`${animationTime}s`}
            repeatCount="indefinite"
            values="red;orange;yellow;green;blue;indigo;violet;red"
          />
        </path>
      </svg>{' '}
    </div>
  )
})
export default SvgAnimation
