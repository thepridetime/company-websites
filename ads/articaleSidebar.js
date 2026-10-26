

import AdSlot from "../components/AdSlot";
 
function ArticleBody({ paragraphs }) {

  return (
<div className="article-body">

      {paragraphs.map((paragraph, index) => (
<React.Fragment key={index}>
<p>{paragraph}</p>
 
          {index === 3 && (
<AdSlot

              slot="3333333333"

              className="ad-in-article"

            />

          )}
</React.Fragment>

      ))}
</div>

  );

}
 
export default ArticleBody;

 