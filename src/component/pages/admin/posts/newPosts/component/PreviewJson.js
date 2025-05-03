
import styles from "@/component/style/BlogContent.module.css";
export default function PreviewJson({ postJson }) {


    return (
        <div className={styles.container}>
            {postJson && (
                <div className="p-2">
                    <pre>{JSON.stringify(postJson, null, 2)}</pre>

                </div>
            )}
        </div>
    );
}
