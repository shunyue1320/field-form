import * as React from 'react';
import StateForm, { FormInstance } from '../../src/';
import { FieldProps } from '../../src/Field';

const { Field } = StateForm;

const Error = ({ children }) => (
  <ul style={{ color: 'red' }}>
    {children.map((error: string) => (
      <li key={error}>{error}</li>
    ))}
  </ul>
);

const FieldState = ({ touched, validating }: { touched: boolean; validating: boolean }) => {
  return (
    <div style={{ color: 'green', position: 'absolute', marginTop: -35, left: 300 }}>
      {touched ? <span>Touched!</span> : null}
      {validating ? <span>Validating!</span> : null}
    </div>
  );
};

interface LabelFieldProps extends FieldProps {
  label?: React.ReactNode;
}

const LabelField: React.FunctionComponent<LabelFieldProps> = ({
  name,
  label,
  children,
  ...restProps
}) => {
  return (
    <Field name={name} {...restProps}>
      {(control, meta, form) => {
        const childNode =
          typeof children === 'function'
            ? children(control, meta, form)
            : React.cloneElement(children as React.ReactElement, { ...control });

        return (
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ flex: 'none', width: 100 }}>{label || name}</label>

              {childNode}
            </div>

            <FieldState {...meta} />
            <Error>{meta.errors}</Error>
          </div>
        );
      }}
    </Field>
  );
};

export default LabelField;