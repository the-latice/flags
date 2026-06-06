import { FLAG_SKELETON_STYLES } from "@latice/flags-core";

export function FlagSkeleton() {
  return (
    <>
      <style>{`
        ${FLAG_SKELETON_STYLES.keyframes}
        .${FLAG_SKELETON_STYLES.className} { ${FLAG_SKELETON_STYLES.base} }
        ${FLAG_SKELETON_STYLES.darkSelector} { ${FLAG_SKELETON_STYLES.dark} }
      `}</style>
      <div
        className={FLAG_SKELETON_STYLES.className}
        style={{ width: "100%", height: "100%", borderRadius: 0 }}
      />
    </>
  );
}
