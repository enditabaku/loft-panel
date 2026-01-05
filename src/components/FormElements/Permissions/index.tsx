import { Checkbox } from "@/components/ui-elements/checkbox"
import { readablePermission } from "@/lib/utils";

type Permission = {
    name: string,
    value: boolean
}

type Props = {
    permissions: Permission[],
    onChange: any,
    className: string,
    relations?: any
}

export function PermissionsDisplay({
    permissions,
    onChange,
    className,
    relations
}: Props) {
    function findPermissionParents(permission: string) {
        return Object.keys(relations).filter(key => relations[key].includes(permission));
    }

    function permissionAnyParentChecked(permission: string) {
        const parents = findPermissionParents(permission)
        const hasTrue = parents.some(p => permissions.some(x => x.name === p && x.value));
        return hasTrue
    }

    function handleChange(accessItem: any) {
        if (permissionAnyParentChecked(accessItem.name)) return;
        else { onChange({ name: accessItem.name, value: !accessItem?.value }) }
    }

    return (
        <div className={className}>
            {permissions?.length > 0 ? (
                <>
                    {permissions?.map((access: Permission) => (
                        <div className="flex gap-0 items-center">
                            <Checkbox
                                label={""}
                                name={access?.name}
                                withIcon="check"
                                minimal
                                classname=""
                                checked={access?.value}
                                radius="md"
                                onChange={() => { handleChange(access) }}
                                disabled={permissionAnyParentChecked(access.name)}
                            />
                            <span className="cursor-pointer" onClick={() => { handleChange(access) }}>{readablePermission(access?.name)}</span>
                        </div>
                    ))}
                </>
            ) : (
                <span>There are no permisssions</span>
            )}
        </div>
    )
}