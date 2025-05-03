
import styles from "@/component/style/BlogContent.module.css";
export default function PreviewConten({ postHtml }) {


    return (
        <div className={styles.container}>
            {postHtml && (
                <div className="p-2">
                    {postHtml}
                </div>
            )}
        </div>
    );
}
